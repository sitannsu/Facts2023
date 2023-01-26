const express = require("express");
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  userPhoto,
  hasAuthorization,
  deleteUser,
} = require("../controllers/userController");
const { requireSignin } = require("../controllers/authController");
const { verify } = require("../validator/tokenverify");

const router = express.Router();

router.get("/user/all", verify,  allUsers);
router.get("/user/:userId",   getUser);
router.post("/user/:userId", verify,  updateUser);
router.delete('/user/:userId',deleteUser)
// photo
router.get("/user/photo/:userId", userPhoto);

// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);

module.exports = router;
