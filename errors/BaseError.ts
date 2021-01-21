import { Code } from 'types/state';

class BaseError extends Error {
  code: Code;

  name: string;

  message: string;

  constructor(message: string, code: Code) {
    super(message);

    this.name = this.constructor.name;
    this.message = message;
    this.code = code;
  }
}

export default BaseError;
