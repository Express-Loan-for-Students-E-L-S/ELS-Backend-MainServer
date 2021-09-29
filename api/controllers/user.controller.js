exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

const client = require('../config/grpc.config')

exports.getBankDetails = (req, res) => {
  let phoneno = {
    phoneNum: req.body.phoneNum
  }
  client.getUserBankInfo(phoneno, (error, userBankDetails) => {
    if (!error) {
      res.status(200).json({
        message: 'successfully fetch List userBankDetails',
        userBankDetails
      })
    } else {
      res.status(500).json(error)
    }
  })
}