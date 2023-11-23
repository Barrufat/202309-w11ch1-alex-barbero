import { Router } from "express";
import UsersController from "../controller/UsersController.js";
import UsersMongooseRepository from "../repository/UsersMongooseRepository.js";
import { customerValidation } from "../schema/CustomerSchema.js";

const usersRouter = Router();

const usersRepository = new UsersMongooseRepository();
const usersController = new UsersController(usersRepository);

usersRouter.get("/", usersController.getUsers);
usersRouter.post("/", customerValidation, usersController.registerUser);
usersRouter.post("/login", usersController.loginUser);

export default usersRouter;
