// Server URL for making backend requests
// * Eslint disabled because this variable is defined in "root/webpack.config.js"
// eslint-disable-next-line no-undef
// export const ROOT_URL = REACT_APP_ROOT_URL || 'localhost:9090';
// eslint-disable-next-line import/prefer-default-export
export const ROOT_URL = window.location.origin.includes('localhost')
  ? 'http://localhost:9090/api' : `${window.location.origin}/api`;
// Auth token name for storage and transmission to backend

// Number of ms before an axios request times out
export const requestTimeout = 1000;

/**
 * Middleware function to generate standard user-facing error message
 * * Note: to maintain truthiness state of message, if message is considered falsy this function will return an empty string
 * @param {*} message - Message string to render
 */
export function generateFrontendErrorMessage(message) {
  return message ? `Error: "${message}"` : '';
}
