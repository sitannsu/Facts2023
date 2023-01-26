const express = require("express");
const {
  userSignupValidator,
  userSigninValidator,
  validateCar,
} = require("../validator");
const {
  userById,
  hasAuthorization,
  isMarshal,
} = require("../controllers/userController");
const {
  CreateTrip,
  getTrip,
  getAllTrip,
  updateTrip,
  SignupForTrip,
  getRideByUserId,
  getAllTripsForMarshal,
  updateRide,
  signoutRide,
  getMyAllTrip,
  kickoutUser,
  SignupForTripWaiting,
  SignupForTripMayBe,
  searchTrips,
  signoutMaybe,
  getAllLocations,
  kickoutMaybe,
  kickoutWaiting,
  getRideByRideId,
  updateAttendance,
  closeTrip,
  SignupForTripAsSupport,
  signoutSupport,
  rideDetailsOfGivenUserByTripId,
  updateAttendanceSupport,
  kickoutSupport,
  cancelTrip,
  SignupForTripByLinkWithMarshal,
} = require("../controllers/tripController");
const { verify } = require("../validator/tokenverify");
const { notifiaction } = require("../controllers/notificationCotroller");
const router = express.Router();
router.post("/get/all", getAllTrip);
router.post("/create/:userId", verify, isMarshal, CreateTrip);
router.get("/get/:tripId", getTrip);
router.get("/get/all/:userId", verify, getAllTripsForMarshal);

router.put("/update/:tripId", verify, updateTrip);
router.put("/closeTrip/:tripId", verify, closeTrip);
router.put("/cancel/:tripId", verify, cancelTrip);
router.post("/ride/join/:userId", SignupForTrip);
router.post("/ride/join/support/:userId", SignupForTripAsSupport);
router.post("/ride/join/waiting/:userId", SignupForTripWaiting);
router.post(
  "/ride/join/force/:userId/:mid/:tid",
  verify,
  SignupForTripByLinkWithMarshal
);

router.get("/ride/get/:userId", getRideByUserId);
router.get("/ride/getride/:rideId", getRideByRideId);
router.put("/ride/update/:rideId", updateRide);
router.get("/ride/getbytrip/:tripId", verify, rideDetailsOfGivenUserByTripId);
router.post("/join/maybe/:userId", verify, SignupForTripMayBe);
router.get("/ride/maybe/list");

router.get("/search", searchTrips);

router.post("/ride/signout/:tripId", verify, signoutRide);
router.post("/ride/signout/maybe/:tripId", verify, signoutMaybe);
router.post("/ride/signout/support/:tripId", verify, signoutSupport);
router.get("/mytrip/all", verify, getMyAllTrip);
router.get("/location/all", getAllLocations);
router.post("/kickoutuser/:tripId", kickoutUser);
router.post("/kickoutMayBe/:tripId", kickoutMaybe);
router.post("/kickoutWaiting/:tripId", kickoutWaiting);
router.post("/kickoutSupport/:tripId", kickoutSupport);
router.post("/updateattendance", verify, updateAttendance);
router.post("/updateattendance/support", verify, updateAttendanceSupport);
router.post("/sendTestNotification", notifiaction);
// any route containing :userId, our app will first execute userByID()
router.param("userId", userById);
module.exports = router;
