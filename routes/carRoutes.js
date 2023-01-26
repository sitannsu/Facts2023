const express = require("express");
const {
  userSignupValidator,
  userSigninValidator,
  validateCar,
} = require("../validator");
const { userById, hasAuthorization } = require("../controllers/userController");
const {
  addMyCar,
  getCarDetails,
  updateCarDetails,
} = require("../controllers/carController");
const { verify } = require("../validator/tokenverify");
const router = express.Router();

router.post(
  "/create/:userId",
  validateCar("createCar"),
  verify,
  hasAuthorization,

  addMyCar
);
router.get(
  "/get/:userId",
  validateCar("getMyCar"),
  verify,
  hasAuthorization,

  getCarDetails
);

router.put(
  "/update/:cardId",

  updateCarDetails
);
// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);
module.exports = router;
