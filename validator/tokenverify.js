const jwt = require("jsonwebtoken");

exports.verify = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  // decode token

  console.log("tokentoken",token);
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res
          .status(401)
          .json({ error: true, message: "Unauthorized access." });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      error: true,
      message: "No token provided.",
    });
  }
};
