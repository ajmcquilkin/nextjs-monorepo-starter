// Secure values (server-side only)
declare let __AUTH_SECRET__: string;
declare let __SESSION_SECRET__: string;
declare let __MONGODB_URI__: string;
declare let __S3_BUCKET__: string;
declare let __AWS_ACCESS_KEY_ID__: string;
declare let __AWS_SECRET_ACCESS_KEY__: string;
declare let __ENABLE_CAS_DEV_MODE__: boolean;

// Insecure values (server and client side)
declare let __MODE__: string;
declare let __APP_URL__: string;
declare let __REGENERATION_INTERVAL__: number;
