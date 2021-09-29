exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

const client = require('../config/grpc.config')

exports.getNotes = (req, res) => {
  client.list({}, (error, notes) => {
      if (!error) {
          res.status(200).send({
            message: 'successfully fetch List notes',
            notes
          });
      } else {
          res.status(500).send(error)
      }
  })
}