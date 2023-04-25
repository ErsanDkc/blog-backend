const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const connection = require("../database/db");
const router = express.Router();

const serverless = require("serverless-http");
app.use(express.json());

app.use(cors());

// resim dosyalarını okumak için izin ver
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRouter = require("../routers/auth.router");
const postsRouter = require("../routers/post.router");

connection();

app.router("", authRouter);
app.router("", postsRouter);

app.listen(5000, () => console.log("Server is UP! at 5000 port"));

app.use("/.netlify/functions", router);
module.exports.handler = serverless(app)
