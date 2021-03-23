import BaseError from 'errors/BaseError';

class FieldValidationError extends BaseError {
  field: string;

  constructor(field: string, info = '') {
    super(`Invalid value at field "${field}"${info ? ` (${info})` : ''}`, 400);

    this.field = field;
  }
}

export default FieldValidationError;
