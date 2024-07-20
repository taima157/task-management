import { Router } from "express";
import UserRoutes from "./UserRoutes";
import AuthRoutes from "./AuthRoutes";

const RootRoute = Router();

RootRoute.use("/user", UserRoutes);
RootRoute.use("/auth", AuthRoutes);

export default RootRoute;
