## 写経
[node.js/expressでユーザ認証with JWT](https://qiita.com/AkihiroTakamura/items/ac4f1d3ec32effdd63d2)

<br/>
<br/>

## 成果物
このリポジトリのみ

<br/>
<br/>

## 技術スタック
- Express v4.21.1
- jsonwebtoken v9.0.2
- mongoose v8.8.2
- MongoDB(Docker)

<br/>
<br/>

## 実行したコマンド（順不同）
- docker run --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=pass \
  -p 27017:27017 \
  -d mongo:latest
- npm init
- npm install express body-parser morgan mongoose jsonwebtoken
- node server.js
- npm i nodemon
- npx nodemon server.js

<br/>
<br/>

## 学べる点
- JWTを使ったユーザー認証（バックエンドで実装）
- MongoDB(Docker)との接続とCRUD

<br/>
<br/>

## 使用した外部サービス
- なし

<br/>
<br/>

## 他
- 記事は古いが非常に参考になる
- 認証が必要なルーティングと不要なルーティングを分けれる（コードの記述順）
