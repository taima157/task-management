import { Response } from "express";

export default class BaseError extends Error {
  constructor(res: Response, message: string | Object, statusCode: number) {
    super(typeof message === "string" ? message : "Runtime Error");

    res.status(statusCode).send({ statusCode, message });
  }
}
