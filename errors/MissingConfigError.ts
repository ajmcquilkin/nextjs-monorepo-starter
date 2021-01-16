import BaseError from './BaseError';

class MissingConfigError extends BaseError {
  key: string;

  constructor(key: string) {
    super(`Missing environment variable with key "${key}"`, 500);
    this.key = key;
  }
}

export default MissingConfigError;
