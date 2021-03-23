import BaseError from 'errors/BaseError';

class ForbiddenResourceError extends BaseError {
  constructor(customMessage = '') {
    super(customMessage || 'Resource access forbidden', 403);
  }
}

export default ForbiddenResourceError;
