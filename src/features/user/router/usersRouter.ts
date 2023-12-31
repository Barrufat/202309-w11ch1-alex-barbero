import { Router } from "express";
import UsersController from "../controller/UsersController.js";
import UsersMongooseRepository from "../repository/UsersMongooseRepository.js";

const usersRouter = Router();

const usersRepository = new UsersMongooseRepository();
const usersController = new UsersController(usersRepository);

usersRouter.get("/", usersController.getUsers);
usersRouter.post("/", usersController.registerUser);
usersRouter.post("/login", usersController.loginUser);

export default usersRouter;
