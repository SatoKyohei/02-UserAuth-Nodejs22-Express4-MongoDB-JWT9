const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Userモデル作成とエクスポート
module.exports = mongoose.model(
    "User",
    new Schema({
        name: String,
        password: String,
        admin: Boolean,
    })
);
