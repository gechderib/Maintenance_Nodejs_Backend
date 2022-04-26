const mongoose = require("mongoose")
const MaintenanceProplem = require("./proplems.models")
const Role = require("./roles.models")
const User = require("./user.models")
const Solution = require("./solutions.models")

const db = {}

db.mongoose = mongoose
db.user = User
db.roles = Role
db.maintenanceProblem = MaintenanceProplem
db.maintenanceSoln = Solution

db.ROLES = ['user','admin','tech']

module.exports = db