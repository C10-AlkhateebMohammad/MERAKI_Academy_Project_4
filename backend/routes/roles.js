const express = require("express");

const { createNewRole } = require("../controllers/roles");

const rolesRouter = express.Router();

rolesRouter.post("/creat", createNewRole);

module.exports = rolesRouter;
