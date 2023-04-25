const mongoose = require("mongoose");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path")
const User = require("./models/user")
const Post = require("./models/post");
const connection = require("./database/db");
const upload = require("./services/upload");
app.use(express.json());

app.use(cors());

// resim dosyalarını okumak için izin ver 
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

connection();




const secretKey = "Secret key secret key 12345";
const options = {
  expiresIn: "1h",
};

//register
app.post("/api/register", upload.single("avatar"), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({
      _id: uuidv4(),
      name,
      email,
      password,
      avatar: req.file,
    });

    const result = await user.save();

    const payload = {
      user: result,
    };

    const token = jwt.sign(payload, secretKey, options);

    res.json({ token: token, user: result });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
});

//login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password });
    if (user === null) {
      res.status(403).json({ message: "Mail adresi ya da şifre yanlış" });
    } else {
      const payload = {};
      const token = jwt.sign(payload, secretKey, options);

      res.json({ token: token, user: user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//Post add
app.post("/api/post", async (req, res) => {
  try {
    const { userId, content, title } = req.body;
    const post = new Post({
      _id: uuidv4(),
      userId: userId,
      content: content,
      title:title,
      createdDate: new Date(),
    });

    await post.save();
    res.json({ message: "Post was shared!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get Post
app.get("/api/posts", async (req, res) => {
  try {
    const post = await Post.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "users",
        },
      },
    ]).sort({createdDate: -1});

    res.json(post)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

app.listen(5000, () => console.log("Server is UP! at 5000 port"));
