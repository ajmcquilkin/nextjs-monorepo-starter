// Server URL for making backend requests
// * Eslint disabled because this variable is defined in "root/webpack.config.js"
// eslint-disable-next-line no-undef
// export const ROOT_URL = REACT_APP_ROOT_URL || 'localhost:9090';
export const ROOT_URL = `${window.location.origin}/api`;

// Auth token name for storage and transmission to backend
export const authTokenName = 'authToken';
