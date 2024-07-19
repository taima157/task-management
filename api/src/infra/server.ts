import http from "http";
import app from "../app";
import connection from "../database/connection";

const server = http.createServer(app);

server.listen(process.env.API_PORT || 8080, async () => {
  console.log("Rodando na porta", process.env.API_PORT);

  try {
    await connection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});