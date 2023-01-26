const express = require("express");
const {
  signup,
  signin,
  signout,
  forgotPassword,
  resetPassword,
  socialLogin,
  confirmEmail,
  changepassword,
  sendOtpMail,
  sendOtpPhone,
  verifyOtpPhone,
  validateEmailOtp,
  Marshalsignin,
  sso,
} = require("../controllers/authController");

// import password reset validator
const { userSignupValidator, userSigninValidator } = require("../validator");
const {
  userById,
  hasAuthorization,
  hasMarshalAuthorization,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin",  signin);
router.post("/marshalsignin", hasMarshalAuthorization, Marshalsignin);
router.get("/signout", signout);
router.post("/confirmmail", confirmEmail);

// password forgot and reset routes
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);
router.put("/change-password", changepassword);

// then use this route for social login
// router.post("/social-login", socialLogin);
router.post("/social-login", sso);

// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);

router.post("/sendOtpMail", sendOtpMail);
router.post("/sendOTP", sendOtpPhone);

router.post("/verifyOtp", verifyOtpPhone);
router.post("/validateEmailOtp", validateEmailOtp);

module.exports = router;
