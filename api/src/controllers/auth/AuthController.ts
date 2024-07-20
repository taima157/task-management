import { NextFunction, Request, Response } from "express";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import { LoginRequestDTO } from "./dto/LoginRequestDTO";
import { SignUpDTO } from "./dto/SignUpDTO";

export default class AuthController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const body: SignUpDTO = req.body;

      await UserService.create(body);

      return res.status(201).send({ message: "Usuário criado com sucesso!" });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body: LoginRequestDTO = req.body;

      return res.status(200).send(await AuthService.login(body));
    } catch (err) {
      next(err);
    }
  }
}
