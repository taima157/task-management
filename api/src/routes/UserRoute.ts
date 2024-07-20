import { Router } from "express";
import UserController from "../controllers/UserController";

const UserRoute = Router();

UserRoute.get("/", UserController.getAll);
UserRoute.get("/:idUser", UserController.getById);

export default UserRoute;
