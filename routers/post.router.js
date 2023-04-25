const express = require("express");
const Post = require("../models/post");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");



//Post add
router.post("/api/post", async (req, res) => {
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
  router.get("/api/posts", async (req, res) => {
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

  module.exports = router;