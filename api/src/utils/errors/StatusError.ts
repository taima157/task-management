export enum StatusErrorEnum {
  NOT_FOUND = "NOT_FOUND",
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
}

export class ResponseError {
  private status: number;
  private message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

export default class StatusError extends Error {
  public name: string;

  constructor(name: StatusErrorEnum, message: string) {
    super(message);
    this.name = name;
  }
}
