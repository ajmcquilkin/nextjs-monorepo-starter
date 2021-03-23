import BaseError from 'errors/BaseError';

class UniqueFieldError extends BaseError {
  field: string;

  value: string | number;

  constructor(field: string, value: string | number) {
    super(`Field "${field}" with value "${value}" already exists`, 409);

    this.field = field;
    this.value = value;
  }
}

export default UniqueFieldError;
