const express = require("express");
const { requireSignin } = require("../controllers/authController");
const {
  createPost,
  updatePost,
  getPost,
  getPosts,
  like,
  comment,
  likeComment,
} = require("../controllers/postController");
const { userById } = require("../controllers/userController");
const { verify } = require("../validator/tokenverify");

const router = express.Router();

router.post("/create", verify, createPost);

router.put("/update", verify, updatePost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/likePost", like);
router.put('/commentPost', comment);
router.put('/likeComment', likeComment);

// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);

module.exports = router;
