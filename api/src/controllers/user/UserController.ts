import { NextFunction, Request, Response } from "express";
import UserService from "../../services/UserService";

export default class UserController {
  static async getAll(req: Request, res: Response) {
    res.status(200).send(await UserService.findAll());
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { idUser } = req.params;

      const user = await UserService.findById(idUser);

      return res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }
}
