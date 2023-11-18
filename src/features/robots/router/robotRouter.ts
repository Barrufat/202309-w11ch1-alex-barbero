import { Router } from "express";
import RobotsMongooseRepository from "../repository/RobotsMongooseRepository.js";
import RobotsController from "../controller/robotsController/RobotsController.js";

const robotRouter = Router();

const robotsRepository = new RobotsMongooseRepository();
const robotsController = new RobotsController(robotsRepository);

robotRouter.get("/", robotsController.getRobots);

export default robotRouter;
