import { Exception } from "./exception";

export class UnauthorisedException extends Exception {
    constructor(message: string) {
      super(message);
      this.code = 401;
    }
  }