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

export const handleEncodeDate = (date: number): string => {
  const dateObject = new Date(date);

  const year = dateObject.getFullYear().toString().padStart(4, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const handleDecodeDate = (date: string): number => {
  const newDate = new Date(date);
  return newDate.getTime();
};

export const getMidnightDate = (date: number): number => {
  const dateInstance = new Date(date);
  dateInstance.setHours(0, 0, 0, 0);
  return dateInstance.getTime();
};

/**
 * Middleware function to generate standard user-facing error message
 * * Note: to maintain truthiness state of message, if message is considered falsy this function will return an empty string
 * @param {*} message - Message string to render
 */
export const generateFrontendErrorMessage = (message: string): string => (message ? `Error: "${message}"` : '');
