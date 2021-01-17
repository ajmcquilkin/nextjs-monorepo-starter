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
