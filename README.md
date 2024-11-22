docker run --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=pass \
  -p 27017:27017 \
  -d mongo:latest
npm init
npm install express body-parser morgan mongoose jsonwebtoken
node server.js
npm i nodemon
npx nodemon server.js

express v4.21.1
jsonwebtoken v9.0.2
mongoose v8.8.2
morgan v1.10.0
nodemon v3.1.