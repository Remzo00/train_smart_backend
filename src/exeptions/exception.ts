export class Exception extends Error {
    code: number;
    
    constructor(message: string = "Server error", code: number = 500) {
      super(message);
      this.code = code;
    }
  }
  