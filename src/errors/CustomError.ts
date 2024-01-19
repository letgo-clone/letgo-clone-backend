class CustomError extends Error {
    statusCode: number;
    type: string;

    constructor (statusCode: number, message: string, type: string) {
      super(message);
      this.name = this.constructor.name;
      this.type = type;
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, CustomError.prototype);
    }
}

module.exports = CustomError;