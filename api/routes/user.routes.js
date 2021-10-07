const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

// Setting up multer
const multer = require('multer');
const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, '')
  }
});
const upload = multer({storage}).single('file');


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.post("/api/test/getBankDetails", controller.getBankDetails);

  app.post("/api/upload", [authJwt.verifyToken, upload], controller.uploadFile);
};