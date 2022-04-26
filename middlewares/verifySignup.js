const db = require("../models/index");
const User = db.user;
const roles = db.roles;
const ROLES = db.ROLES;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {

    if (err) {

      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      console.log(user.email)
      return res.status(400).send({ message: `${user.email} already existed` });
    }
    // User.findOne({ username: req.body.username }, (err, user) => {
    //   if (err) {
    //     res.status(500).send({ message: err });
    //     return;
    //   }
    //   if (user) {
    //     return res
    //       .status(400)
    //       .send({ message: `${user.username} already existed` });
    //   }
      next();
    // });
  });
};

checkRoleExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        
        res
          .status(400)
          .send({ message: `role ${req.body.roles[i]} doesn't exist` });
        return;
      }
    }
  }

  next();
};

const verifySignup = {
  checkDuplicateUsernameOrEmail,
  checkRoleExisted,
};

module.exports = verifySignup;
