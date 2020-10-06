import dotenv from 'dotenv';
import packageInfo from '../../package.json';

dotenv.config({ silent: true });

export const PORT = process.env.PORT || 9090;
// eslint-disable-next-line prefer-destructuring
export const MONGODB_URI = process.env.MONGODB_URI;
export const SELF_URL = process.env.NODE_ENV === 'development' ? `localhost:${9090}` : packageInfo.productionURL;
export const APP_URL = process.env.NODE_ENV === 'development' ? `localhost:${8080}` : packageInfo.productionClientURL;
