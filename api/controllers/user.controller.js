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
	let obj = {
		id: req.body.id
	}
	client.getUserBankInfo(obj, (error, userBankDetails) => {
		if (!error) {
			User.findOneAndUpdate(
				{ _id: req.userId },
				{ $set: { "userBankDetails": userBankDetails } },
				function (err, docs) {
					if (err) {
						console.log(err)
					}
					else {
						res.status(200).json({
							message: 'successfully fetch List userDetails',
							userDetails: docs.userBankDetails
						})
					}
				})
		} else {
			res.status(500).json(error)
		}
	})
}

exports.getConnectedBanks = (req, res) => {
	let phoneno = {
		phoneNum: req.body.phoneNum
	}
	client.getConnectedBanks(phoneno, (error, userBankDetails) => {
		if (!error) {
			res.status(200).json({
				message: 'successfully fetch List of connected banks',
				userDetails: userBankDetails
			})
		} else {
			res.status(500).json(error)
		}
	})
}

exports.requestLoanOptions = (req, res) => {
	let exploreinfo = req.body.exploreinfo;
	client.requestLoanOptions(exploreinfo, (error, loanOptions) => {
		if (!error) {
			res.status(200).json({
				message: 'successfully fetch loan options',
				options: loanOptions
			})
		} else {
			res.status(500).json(error)
		}
	})

}

// AWS
exports.uploadFile = (req, res) => {
	let myFile = req.file.originalname.split(".");
	const fileName = myFile[myFile.length - 2];
	const fileType = myFile[myFile.length - 1];

	const params = {
		Bucket: process.env.AWS_BUCKET_NAME + "/" + req.userId,
		Key: `${req.body.document}.${fileType}`,
		Body: req.file.buffer
	}
	s3.upload(params, (err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			User.findOneAndUpdate(
				{ _id: req.userId },
				{
					$set: {
						["documents." + req.body.document]: {
							location: data.Location,
							uploadedFileName: fileName + '.' + fileType
						}
					}
				},
				function (err, docs) {
					if (err) {
						res.status(500).send(err);
					}
					else {
						res.status(200).send({
							location: data.Location,
							uploadedFileName: fileName + '.' + fileType
						})
					}
				})
		}
	})

}