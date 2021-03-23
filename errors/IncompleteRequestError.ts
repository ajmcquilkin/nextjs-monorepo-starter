import BaseError from 'errors/BaseError';

class IncompleteRequestError extends BaseError {
  field: string;

  info: string;

  constructor(field: string, info = '') {
    super(`Field "${field}" not included in request${info ? ` (${info})` : ''}`, 400);

    this.field = field;
    this.info = info;
  }
}

export default IncompleteRequestError;
