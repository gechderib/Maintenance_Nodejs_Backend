const express = require("express");
const cors = require("cors")
const res = require("express/lib/response");
const db = require("./models/index");
const Role = db.roles;
const app = express();

var corsOption = {origin:'http://localhost:3000'}


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption))


db.mongoose
  .connect("mongodb://localhost/mnt_db", {})
  .then(() => {
    addRoles();
    console.log("successfully connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

require("./routers/auth.routes")(app);
require("./routers/user.routes")(app)

app.listen(5000, () => {
  console.log("SERVER LISTING TO PORT 5000");
});

function addRoles() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count == 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        console.log("User role successfully added");

      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        console.log("Admin role successfully added");
      });
      
      new Role({
        name: "tech",
      }).save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        console.log("tech role successfully added");
      });
    }
  });
}
