import { NextFunction, Request, Response } from "express";
import StatusError, {
  ResponseError,
  StatusErrorEnum,
} from "../../utils/errors/StatusError";

export default function validationErrorHandler(
  err: StatusError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  switch (err.name) {
    case StatusErrorEnum.NOT_FOUND:
      res.status(404).send(new ResponseError(404, err.message));
      break;
    case StatusErrorEnum.BAD_REQUEST:
      res.status(400).send(new ResponseError(400, err.message));
      break;
    case StatusErrorEnum.UNAUTHORIZED:
      res.status(401).send(new ResponseError(401, err.message));
      break;
  }

  next(err);
}
