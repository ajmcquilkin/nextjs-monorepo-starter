export const backendUrl = `${__APP_URL__}/api/`;
export const requestTimeout = 5000; // ms

export const maxContentLength = 500;

export const getFullDate = (): string => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  return `${month}/${day}/${year}`;
};

/**
 * Middleware function to generate standard user-facing error message
 * * Note: to maintain truthiness state of message, if message is considered falsy this function will return an empty string
 * @param {*} message - Message string to render
 */
export const generateFrontendErrorMessage = (message: string): string => (message ? `Error: "${message}"` : '');
