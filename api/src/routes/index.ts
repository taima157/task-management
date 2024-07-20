import { Router } from "express";
import UserRoute from "./UserRoute";

const RootRoute = Router();

RootRoute.use("/user", UserRoute);

export default RootRoute;
