const { Router } = require("express");
const UsersControlller = require("../controllers/UsersController");

const usersRoutes = Router();


const userController = new UsersControlller();

usersRoutes.post("/", userController.create)

usersRoutes.put("/:id", userController.update);


module.exports = usersRoutes
