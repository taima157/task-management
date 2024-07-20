import { Router } from "express";
import UserController from "../controllers/user/UserController";

const UserRoutes = Router();

UserRoutes.get("/", UserController.getAll);
UserRoutes.get("/:idUser", UserController.getById);

export default UserRoutes;
