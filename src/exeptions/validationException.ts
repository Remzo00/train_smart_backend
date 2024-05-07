import { Exception } from "./exception";

export class ValidationException extends Exception {
    constructor(message: string) {
      super(message);
      this.code = 400;
    }
  }