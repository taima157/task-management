import express from "express"

const app = express();

app.get("/", (_, res) => {
  return res.status(200).send({ message: "test"})
})

export default app;