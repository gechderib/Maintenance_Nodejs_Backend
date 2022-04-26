const jwt = require("jsonwebtoken");
const db = require("../models/index");
const jwtSecret = require("../config/auth.config");
User = db.user;
Role = db.roles;


exports.signup = (req, res) => {
  const user = new User({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.status(200).send({ message: "user Successsully created" });
          });
        }
      );
    } else {
      Role.find({
        name: "user",
      }).exec((err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = role[0]._id;
        
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(201).send({ message: "user register successfully 2" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        
        res.status(401).send({ message: "Unauthorized user" });
        return
      }

      const passwordIsValid = req.body.password.localeCompare(user.password);
      if (passwordIsValid !== 0) {
        return res
          .status(400)
          .send({ message: "Invalid password", accessToke: null });
      }

      var token = jwt.sign({ id: user.id }, jwtSecret.secret, {
        expiresIn: 86400,
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      console.log("")
      res.status(200).send({
        id: user.id,
        email: user.email,
        accessToken: token,
        roles: authorities,
        fullname:user.fullname,
        propList:user.propList,
        username:user.username
      });
    });
};
