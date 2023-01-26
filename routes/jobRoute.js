const express = require("express");
 
const {
  createPost,
  updatePost,
  getPost,
  getPosts,
  like,
  comment,
  likeComment,
  getPostsBasedOnDate,
  signin
} = require("../controllers/jobController");
 
const { verify } = require("../validator/tokenverify");

const router = express.Router();

router.post("/create", createPost);
router.post("/signin", signin);
router.put("/update",verify, updatePost);
router.get("/getAllJob",verify, getPosts);
router.post("/getAllJobBasedOnDate", getPostsBasedOnDate);
router.get("/:id", getPost);
 

// any route containing :userId, our app will first execute userByID()
 

module.exports = router;
