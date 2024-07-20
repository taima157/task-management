import { Request, Response } from "express";
import UserService from "../services/UserService";
import NotFound from "../utils/errors/NotFound";

export default class UserController {
  static async getAll(req: Request, res: Response) {
    res.status(200).send(await UserService.findAll());
  }

  static async getById(req: Request, res: Response) {
    const { idUser } = req.params;

    const user = await UserService.findById(idUser);

    if (user) {
      return res.status(200).send(user);
    }

    throw new NotFound(res, "Usuário não encontrado!");
  }
}
