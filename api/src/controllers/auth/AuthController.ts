import { Request, Response } from "express";
import SignUpDTO from "./dto/SignUpDTO";
import BaseError from "../../utils/errors/StatusError";
import UserService from "../../services/UserService";

export default class AuthController {
  static async signUp(req: Request, res: Response) {
    const body: SignUpDTO = req.body;

    try {
      await UserService.create(body);

      return res.status(201).send({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      throw new BaseError(res, error, 400);
    }
  }

  static async login(req: Request, res: Response) {}
}
