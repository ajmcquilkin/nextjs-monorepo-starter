import BaseError from './BaseError';

class ForbiddenResourceError extends BaseError {
  constructor(customMessage = '') {
    super(customMessage || 'Resource access forbidden', 403);
  }
}

export default ForbiddenResourceError;
