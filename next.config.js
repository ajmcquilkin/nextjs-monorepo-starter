module.exports = {
  target: 'serverless',
  webpack: (config, {
    buildId, dev, isServer, defaultLoaders, webpack
  }) => {
    config.plugins.push(new webpack.DefinePlugin({
      ...(isServer ? {
        // ! Secure values here
        __AUTH_SECRET__: JSON.stringify(process.env.AUTH_SECRET || ''),
        __SESSION_SECRET__: JSON.stringify(process.env.SESSION_SECRET || ''),
        __MONGODB_URI__: JSON.stringify(process.env.MONGODB_URI || ''),
        __S3_BUCKET__: JSON.stringify(process.env.S3_BUCKET || ''),
        __AWS_ACCESS_KEY_ID__: JSON.stringify(process.env.AWS_ACCESS_KEY_ID || ''),
        __AWS_SECRET_ACCESS_KEY__: JSON.stringify(process.env.AWS_SECRET_ACCESS_KEY || '')
      } : {}),

      // !!! ONLY place INSECURE values here
      __MODE__: JSON.stringify(process.env.MODE || ''),
      __APP_URL__: JSON.stringify((process.env.HEROKU_APP_NAME ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com` : process.env.APP_URL) || ''),
      __SERVICE_URL__: JSON.stringify(process.env.SERVICE_URL || ''),
      __REGENERATION_INTERVAL__: JSON.stringify(process.env.REGENERATION_INTERVAL || 3600),
    }));

    return config;
  },
};
