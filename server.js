const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const config = require("./config");
const User = require("./app/models/user");

const port = process.env.PORT || 8080;

// MongoDB接続
mongoose.connect(config.database);
app.set("superSecret", config.secret);

// body-parser設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Logのリクエスト
app.use(morgan("dev"));


// ルーティング
app.get("/", (req, res) => {
    res.send("Hello! The API is at http://localhost:" + port + "/api");
});

app.get("/setup", (req, res) => {
    const demo = new User({
        name: "demouser",
        password: "password",
        admin: true,
    });
    demo.save()
        .then(() => {
            console.log("User saved successfully");
            res.json({ success: true });
        })
        .catch((err) => {
            throw err;
        });
});


// APIルート作成
const apiRoutes = express.Router();

// non secure api ---------------

// POST(http://localhost:8080/api/authenticate)
apiRoutes.post("/authenticate", (req, res) => {
    User.findOne({ name: req.body.name })
        .then((user) => {
            // バリデーション
            if (!user) {
                res.json({
                    success: false,
                    message: "Authentication failed. User not found.",
                });
                return;
            }

            if (user.password != req.body.password) {
                res.json({
                    success: false,
                    message: "Authentication failed. Wrong password.",
                });
                return;
            }

            // トークン作成
            const token = jwt.sign(user.toObject(), app.get("superSecret"), {
                expiresIn: "24h",
            });

            res.json({
                success: true,
                message: "Authentication successfully finished.",
                token: token,
            });
        })
        .catch((err) => {
            throw err;
        });
});

// Filterを定義した以降に定義したURLはFilter通過後に動作する
apiRoutes.use((req, res, next) => {
    // トークンをbodyから取得
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    // トークンのバリデーション
    if (!token) {
        return res.status(403).send({
            success: false,
            message: "No token provided.",
        });
    }

    jwt.verify(token, app.get("superSecret"), (err, decoded) => {
        if (err) {
            return res.json({
                success: false,
                message: "Invalid token",
            });
        }

        // 後で他のルートで使用するためにトークンをリクエストに保存
        req.decoded = decoded;
        next()
    });
});

// secure api ---------

// GET(http://localhost:8080/api/)
apiRoutes.get("/", (req, res) => {
    res.json({ message: "Welcome to API routing" });
});

// GET(http://localhost:8080/api/users)
apiRoutes.get("/users", (req, res) => {
    User.find({})
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            throw err;
        });
});

app.use("/api", apiRoutes);


// サーバ起動
app.listen(port, () => {
    console.log("started http://localhost:" + port + "/");
});
