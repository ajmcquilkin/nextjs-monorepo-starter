import BaseError from 'errors/BaseError';

class BadCredentialsError extends BaseError {
  constructor(customMessage = '') {
    super(customMessage || 'Invalid credentials', 401);
  }
}

export default BadCredentialsError;
