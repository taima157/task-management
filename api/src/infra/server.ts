import http from "http";
import app from "../app";

const server = http.createServer(app)

server.listen(process.env.API_PORT || 8080, () => {
  console.log("Rodando na porta", process.env.API_PORT)
})