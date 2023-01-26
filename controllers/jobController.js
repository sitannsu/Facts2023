const Post = require("../models/jobModel");
var ISODate = require('isodate');
var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


exports.signin = async (req, res) => {
  const { email, password } = req.body;
  var bytes = CryptoJS.AES.decrypt(
    password,
    process.env.REACT_APP_ENCRYPTION_SECRET_KEY
  );
  var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  // console.log("req.body", req.body);
  // console.log("decrepted", decryptedData);
  // find the user based on email
  //let userTokenData = await UserToken.findOne({ email: email.toLowerCase() });


  
  const token = jwt.sign(
    { _id: email},
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  // persist the token as 't' in cookie with expiry date
  res.cookie("t", token, { expire: new Date() + 9999 });
  // retrun response with user and token to frontend client
  // const { _id, name, email, role, profileImageUrl } = user;
  return res.json({ message: "Successful", token:token});


};

exports.createPost = (req, res) => {
  const post = new Post(req.body);
  post
    .save()
    .then((createdPost) => {
      res.status(201).json({
        message: "Job added successfully!!",
        job: {
          ...createdPost,
          id: createdPost._id,
        },
      });
    })
    .catch((err) => {
      console.log("errerrerr",err);
      res.status(500).json({
        message: "Creating a post failed!",
      });
    });
};
exports.updatePost = (req, res, next) => {
  const post = new Post(req.body);
  Post.updateOne({ _id: req.body.id }, post)
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Update successful!!",
        });
      } else {
        res.status(401).json({
          message: "Update failed!!",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Couldn't update post!",
      });
    });
};

exports.getPosts = (req, res, next) => {
  Post.find()
 
  .then((post) => {
    
    if (post) {
      res.status(200).json({"jobList":post});
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  })
  .catch((err) => {
    console.log("errerrerrerr",err);
    res.status(500).json({
      message: "Fetching post failed!",
    });
  });
};

exports.getPostsBasedOnDate = (req, res, next) => {
  var Todate = new Date(req.body.planDate);
  console.log("TodateTodate11",Todate);
// add a day
 
Todate.setDate(Todate.getDate()+1);
console.log("TodateTodate22",Todate);
  Post.find({planDate: {
 
    $gt: ISODate(req.body.planDate),
    $lt: ISODate(Todate)
},})
 
  .then((post) => {
    
    if (post) {
      res.status(200).json({"jobList":post});
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  })
  .catch((err) => {
    console.log("errerrerrerr",err);
    res.status(500).json({
      message: "Fetching post failed!",
    });
  });
};


exports.getPost = (req, res, next) => {
  Post.findById(req.params.id)
    .populate("creator")
    .then((post) => {
      Post.update({ _id: post._id }, { $set: { count: post.count + 1 } })
        .then((result) => {})
        .catch((error) => {});
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch((err) => {
      console.log("errerrerrerr",err);
      res.status(500).json({
        message: "Fetching post failed!",
      });
    });
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.decoded._id })
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({
          message: "Delete Successful!!",
        });
      } else {
        res.status(401).json({
          message: "Not Authorized!!",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Couldn't delete post!",
      });
    });
};

 
 
 
