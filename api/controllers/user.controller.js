require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
})

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

// gRPC
const client = require('../config/grpc.config');
const User = require('../models/user.model');
exports.getBankDetails = (req, res) => {
  let phoneno = {
    phoneNum: req.body.phoneNum
  }
  client.getUserBankInfo(phoneno, (error, userBankDetails) => {
    if (!error) {
      User.findOneAndUpdate(
        { _id: req.userId },
        { userDetails: userBankDetails },
        function (err, docs) {
          if (err) {
            console.log(err)
          }
          else {
            res.status(200).json({
              message: 'successfully fetch List userDetails',
              userDetails: docs
            })
          }
        })
    } else {
      res.status(500).json(error)
    }
  })
}

// AWS
exports.uploadFile = (req, res) => {
  let myFile = req.file.originalname.split(".");
  const fileType = myFile[myFile.length - 1];

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME + "/" + req.userId,
    Key: `${uuidv4()}.${fileType}`,
    Body: req.file.buffer
  }
  s3.upload(params, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data)
    }
  })

}