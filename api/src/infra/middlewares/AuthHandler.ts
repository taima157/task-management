import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import StatusError, { StatusErrorEnum } from "../../utils/errors/StatusError";

export default function AuthHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_KEY);

    next();
  } catch (err) {
    throw new StatusError(
      StatusErrorEnum.UNAUTHORIZED,
      "Você não tem autorizaçao para efetuar essa ação!"
    );
  }
}
