const controller = require("../controllers/user.controller");
const { isAdmin, isTech, verifyToken } = require("../middlewares/authJwt");
const techController = require("../controllers/tech.controller")
const {checkTechExisted,checkPropAssigned} = require("../middlewares/asignTech") 
module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/all", controller.allAccess);

  app.get("/api/user", verifyToken, controller.userAccess);

  app.get("/api/admin", [verifyToken, isAdmin], controller.adminAccess);

  app.get("/api/getAllTech", techController.getAllTech);

  app.post("/api/user/proplems",[verifyToken],controller.addProplem);

  app.get("/api/admin/getAllProblems",[verifyToken,isAdmin], controller.getAllProblems)
  
  app.get("/api/tech/getAllProblems",[verifyToken,isTech],controller.getAllProblems)

  app.get("/api/admin/getProblemDetail/:maintenance_id",[verifyToken,isAdmin], controller.getOneProblems)

  app.get("/api/tech/getProblemDetail/:maintenance_id",[verifyToken,isTech], controller.getOneProblems)

  app.put("/api/admin/asignTech/:maintenance_id",[verifyToken,isAdmin,checkTechExisted],controller.assignTech)

  app.post("/api/tech/addSolution",[verifyToken,isTech],techController.addSolution)

  app.get("/api/tech/getAllSolutions",[verifyToken],techController.getAllSolutions)

  app.get("/api/tech/getAssignedProplems",[verifyToken,isTech,checkPropAssigned],techController.getAssignedProblems)

  app.get("/api/user/getAskedquestions",verifyToken, techController.getAskedQuestions)

  app.get("/api/user/getSolutionDetail/:id",verifyToken,techController.getOneSolution)

  app.put("/api/user/rateTech/:id",verifyToken,techController.rateTech)

  app.put("/api/user/updateProfile/:id",[verifyToken],controller.updateProfile)

  app.delete("/api/user/deleteOneproblem/:id",[verifyToken],controller.deleteProblem)

  app.get("/api/user/getYourProblems",[verifyToken],techController.getYourProblems)

  app.get("/api/user/getUserById/:id",[verifyToken], controller.getUserById)

  app.put("/api/problem/solved/:id",[verifyToken],techController.updateProblem)

  app.get("/api/admin/getTechToAssign",[verifyToken,isAdmin],controller.getAllTech)
};