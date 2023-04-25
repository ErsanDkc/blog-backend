const express = require("express")
const app = express();
const cors = require("cors");
const path = require("path")
const connection = require("./database/db")


app.use(express.json());
app.use(cors());

//allow to use images

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const authRouter = require("./routers/auth.router")
const postsRouter = require("./routers/post.router")

connection();

app.router("", authRouter)
app.router("", postsRouter)

app.listen(5000, "Server is UP! at 5000 port")
