import express from "express";
import RootRoute from "./routes";

const app = express();

app.get("/", (_, res) => {
  return res.status(200).send({ message: "test" });
});

app.use("/api", RootRoute);

export default app;
