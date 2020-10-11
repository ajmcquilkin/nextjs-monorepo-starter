import packageInfo from '../../package.json';

export const SELF_URL = process.env.NODE_ENV === 'development' ? `localhost:${9090}` : packageInfo.productionURL;

export const APP_URL = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'combined' ? `localhost:${8080}` : SELF_URL;
