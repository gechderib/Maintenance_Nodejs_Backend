const { maintenanceProblem } = require("../models/index");
const db = require("../models/index");
const MaintenanceProblem = db.maintenanceProblem;
const User = db.user;
const Solution = db.maintenanceSoln;

exports.getUserById = (req, res) => {
  const id = req.params.id;
  User.findById(id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(user);
  });
};

exports.addProplem = (req, res) => {
  const maintenanceProblem = new MaintenanceProblem({
    workField: req.body.workField,
    directorateWorkflowName: req.body.directorateWorkflowName,
    officeName: req.body.officeName,
    officeNumber: req.body.officeNumber,
    time: req.body.time,
    sex: req.body.sex,
    isDisabled: req.body.isDisabled,
    itemType: req.body.itemType,
    sysType: req.body.sysType,
    reportedProblem: req.body.reportedProblem,
    assignedTech: req.body.assignedTech,
  });

  maintenanceProblem.save((err, maintenanceProblem) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      maintenanceProblem.postedBy = user._id;
      maintenanceProblem.sysUsername = user.fullname;
      maintenanceProblem.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
        }
        console.log(user.fullname);
        res.status(201).send({ message: "problem successfully added" });
      });
    });
  });
};

exports.getAllProblems = (req, res) => {
  MaintenanceProblem.find({}, (err, maintenanceProblem) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!maintenanceProblem) {
      return res.status(404).send({ message: "no maintenance problem added" });
    }
    res.status(200).send(maintenanceProblem);
  });
};

exports.getOneProblems = (req, res) => {
  const id = req.params.maintenance_id;
  MaintenanceProblem.findById(id, (err, maintenanceProblem) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!maintenanceProblem) {
      return res.status(404).send({ message: `no maintenace problem with id` });
    }
    res.status(200).send(maintenanceProblem);
  });
};

exports.assignTech = (req, res) => {
  const id = req.params.maintenance_id;

  MaintenanceProblem.findByIdAndUpdate(
    id,
    {
      assignedTech: req.techInfo.fullname,
    },
    (err, maintenanceProblem) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      const techId = req.techInfo._id;
      User.findByIdAndUpdate(
        techId,
        { $push: { propList: maintenanceProblem } },
        (err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(201).send({ message: "tech is successfully asigned" });
        }
      );
    }
  );
};

exports.updateProfile = (req, res) => {
  var id = req.params.id;
  User.findByIdAndUpdate(
    id,
    { fullname: req.body.fullname, username: req.body.username },
    (err, user) => {
      if (err) {
        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        res.status(500).send({ message: err });
        return;
      }
      res.status(201).send({ message: "User profile is successfully updated" });
    }
  );
};

exports.deleteProblem = async (req, res) => {
  var id = req.params.id;
  try {
    const problem = await MaintenanceProblem.findOneAndRemove(
      { _id: id },
      { new: true }
    );

    await User.updateMany({ propList: id }, { $pull: { propList: id } });

    res.status(204).send(problem);
  } catch (err) {
    console.log(err);
  }
};

exports.getAllTech = (req, res) => {
  User.find({})
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200).send(user);
    });
};

exports.allAccess = (req, res) => {
  res.status(200).send("All access");
};

exports.userAccess = (req, res) => {
  console.log(req.userId);
  res.status(200).send("User content");
};

exports.adminAccess = (req, res) => {
  res.status(200).send("Admin content");
};

exports.techAccess = (req, res) => {
  res.status(200).send("tech content");
};
