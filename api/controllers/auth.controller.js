const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const defaultUserBankDetails = {
    fname: '',
    lname: '',
    gender: '',
    address: '',
    phoneNum: '',
    email: '',
    fatherName: '',
    MotherName: '',
    dob: '',
    adharNum: '',
    panNum: '',
    accountNum: '',
    ifscCode: '',
    accountType: '',
    bankName: '',
}

const defaultDocuments = {
    adharcard: {
        location: '',
        uploadedFileName: ''
    },
    pancard: {
        location: '',
        uploadedFileName: ''
    },
    marksheet10: {
        location: '',
        uploadedFileName: ''
    },
    marksheet12: {
        location: '',
        uploadedFileName: ''
    },
    entrance: {
        location: '',
        uploadedFileName: ''
    },
    profile: {
        location: '',
        uploadedFileName: ''
    }
}

exports.signup = (req, res) => {
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        userBankDetails: {...defaultUserBankDetails, fname: req.body.fname, lname: req.body.lname, email: req.body.email},
        documents: defaultDocuments
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        user.save(err => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.send({ message: "User was registered successfully!" });
        });
    });
};

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user._id,
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                userBankDetails: user.userBankDetails,
                documents: user.documents,
                accessToken: token
            });
        });
};