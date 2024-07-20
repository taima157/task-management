import { Router } from "express";
import UserRoutes from "./UserRoutes";
import AuthRoutes from "./AuthRoutes";
import AuthHandler from "../infra/middlewares/AuthHandler";

const RootRoute = Router();

RootRoute.use("/user", AuthHandler, UserRoutes);
RootRoute.use("/auth", AuthRoutes);

export default RootRoute;
