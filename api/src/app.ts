import express from "express";
import RootRoute from "./routes";
import validationErrorHandler from "./infra/middlewares/validationErrorHandler";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  return res.status(200).send({ message: "test" });
});

app.use("/api", RootRoute);
app.use(validationErrorHandler);

export default app;
