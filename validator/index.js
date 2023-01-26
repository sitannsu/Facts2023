const { body, param } = require("express-validator/check");

exports.createPostValidator = (req, res, next) => {
  // title
  req.check("title", "Write a title").notEmpty();
  req.check("title", "Title must be between 4 to 150 characters").isLength({
    min: 4,
    max: 150,
  });
  // body
  req.check("body", "Write a body").notEmpty();
  req.check("body", "Body must be between 4 to 2000 characters").isLength({
    min: 4,
    max: 2000,
  });
  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};
exports.ContactEmailValidator = (req, res, next) => {
  // name is not null and between 4-10 characters
  req.check("firstname", "Name is required").notEmpty();
  req.check("firstname", "Name is required").notEmpty();
  // email is not null, valid and normalized
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 2000,
    });
  // check for password
  req.check("number", "Number is required").notEmpty();
  req
    .check("number", "number must be 10 ")
    .matches(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/)
    .withMessage("must be a phone number")
    .isLength({
      min: 10,
      max: 12,
    });
  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};

exports.userSignupValidator = (req, res, next) => {
  // name is not null and between 4-10 characters
  req.check("name", "Name is required").notEmpty();
  // email is not null, valid and normalized
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 2000,
    });
  req
    .check("mobile", "mobile number must be 10 ")
    .matches(/^(?:\+971|00971|0)?(?:50|51|52|55|56|2|3|4|6|7|9)\d{7}$/)
    .withMessage("must be a phone number")
    .isLength({
      min: 6,
      max: 12,
    });
  // check for password
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};
exports.phoneSignupValidator = (req, res, next) => {
  // name is not null and between 4-10 characters
  req.check("name", "Name is required").notEmpty();
  // email is not null, valid and normalized
  req
    .check("number", "number must be 10 ")
    .matches(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/)
    .withMessage("must be a phone number")
    .isLength({
      min: 10,
      max: 12,
    });
  // check for password
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
    .withMessage("6 to 16 valid characters");
  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};
exports.phoneSigninValidator = (request, response, next) => {
  request
    .check("number", "must be a phone number")
    .matches(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/)
    .withMessage("must be a phone number")
    .isLength({
      min: 4,
      max: 12,
    });
  request.check("password", "Invalid Social Login Token!").notEmpty();
  request
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Your social login token is invalid!");
  const errors = request.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

exports.customerSignupValidator = (req, res, next) => {
  // name is not null and between 4-10 characters
  req.check("name", "Name is required").notEmpty();
  // email is not null, valid and normalized
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 2000,
    });
  // check for password
  req.check("phone", "Phone Number is required").notEmpty();
  req
    .check("phone")
    .isLength({ min: 6 })
    .withMessage("Phone Number must contain at least 10 digits")
    .matches(/\d/);
  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};

exports.userSigninValidator = (request, response, next) => {
  request
    .check("email", "Email must be between 3 to 32 characters")
    .matches(
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    )
    .withMessage("Please type your valid email address")
    .isLength({
      min: 4,
      max: 32,
    });
  request.check("password", "Invalid Social Login Token!").notEmpty();
  request
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Your social login token is invalid!");
  const errors = request.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return response.status(400).json({ error: firstError });
  }
  next();
};

exports.passwordResetValidator = (req, res, next) => {
  // check for password
  req.check("newPassword", "Password is required").notEmpty();
  req
    .check("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .matches(
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    )
    .withMessage("must contain a number")
    .withMessage("Password must contain a number");

  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware or ...
  next();
};

exports.validateCar = (method) => {
  console.log(method);
  switch (method) {
    case "createCar": {
      return [
        body("modelName", `modelName doesn'texists`).exists(),
        param("userId", `userId doesn'texists`).exists(),
        body("purchaseYear", `purchaseYear doesn'texists`).exists(),
        body("make", `make doesn'texists`).exists(),
        body("model", `model doesn'texists`).exists(),
        body("trim", `trim doesn'texists`).exists(),
        // body("email", "Invalid email").exists().isEmail(),
        // body("phone").optional().isInt(),
        // body("status").optional().isIn(["enabled", "disabled"]),
      ];
    }
    case "getMyCar": {
      return [
        param("userId", `userId doesn'texists`).exists(),
        body("modelName", `modelName doesn'texists`).exists(),
        body("purchaseYear", `purchaseYear doesn'texists`).exists(),
        body("make", `make doesn'texists`).exists(),
        body("model", `model doesn'texists`).exists(),
        body("trim", `trim doesn'texists`).exists(),
      ];
    }
  }
};
