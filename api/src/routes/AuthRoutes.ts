import { Router } from "express";
import AuthController from "../controllers/auth/AuthController";

const AuthRoutes = Router();

AuthRoutes.post("/signup", AuthController.signUp);
AuthRoutes.post("/login", AuthController.login);

export default AuthRoutes;
