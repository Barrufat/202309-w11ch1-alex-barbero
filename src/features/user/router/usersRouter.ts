import { Router } from "express";
import UsersController from "../controller/UsersController";
import UsersMongooseRepository from "../repository/UsersMongooseRepository";

const usersRouter = Router();

const usersRepository = new UsersMongooseRepository();
const usersController = new UsersController(usersRepository);

usersRouter.post("/", usersController.registerUser);

export default usersRouter;
