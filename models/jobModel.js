const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const Constants = require("../contsants/constants");
const jobSchema = new mongoose.Schema({
  imageLink: {
    type: String,
    trim: true,
    required: true,
  },
 
 
  createDat: {
    type: Date,
    default: Date.now,
  },

  likesCount: {
    type: Number,
    default:0
 
  },
  likesUserList:[ {
    type: String
    
  }],
 
 
 
 
   
   
});

 
 

module.exports = mongoose.model("Job", jobSchema);
