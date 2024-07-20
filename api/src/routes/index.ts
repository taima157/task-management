import { Router } from "express";
import UserRoutes from "./UserRoutes";
import AuthRoutes from "./AuthRoutes";
import AuthHandler from "../infra/middlewares/AuthHandler";
import TaskRoutes from "./TaskRoutes";

const RootRoute = Router();

RootRoute.use("/user", AuthHandler, UserRoutes);
RootRoute.use("/task", TaskRoutes);
RootRoute.use("/auth", AuthRoutes);

export default RootRoute;
