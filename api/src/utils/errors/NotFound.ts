import { Response } from "express";
import BaseError from "./BaseError";

export default class NotFound extends BaseError {
  constructor(res: Response, message: string | Object) {
    super(res, message, 404);
  }
}
