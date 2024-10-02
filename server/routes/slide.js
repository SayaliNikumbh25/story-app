const express = require("express");
const Slide = require("../models/slide");
const Post = require("../models/post");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.get("/slideDetails/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const slide = await Slide.findById(id);
    if (!slide) {
      return res.status(404).send({ error: "Slide not found" });
    }
    res.status(200).json({ slide });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.get("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the post by ID and populate its slides
    const post = await Post.findById(id).populate("slides");

    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }

    // Send the slides associated with the post
    res.status(200).json({ slides: post.slides });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
