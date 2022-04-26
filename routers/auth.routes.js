const {
  checkRoleExisted,
  checkDuplicateUsernameOrEmail,
} = require("../middlewares/verifySignup");

const { isAdmin, isTech, verifyToken } = require("../middlewares/authJwt");

const controller = require("../controllers/auth.controller");

module.exports = (app) => {
  
  app.post(
    "/api/auth/signup",
    [
      checkRoleExisted,verifyToken,isAdmin,
      checkDuplicateUsernameOrEmail],
    controller.signup
  );
  app.post("/api/auth/signin",controller.signin)
};
