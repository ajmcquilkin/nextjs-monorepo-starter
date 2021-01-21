module.exports = {
  webpack: (config, {
    buildId, dev, isServer, defaultLoaders, webpack
  }) => {
    config.plugins.push(new webpack.DefinePlugin({
      ...(isServer ? {
        // ! Secure values here
        __AUTH_SECRET__: JSON.stringify(process.env.AUTH_SECRET || ''),
        __SESSION_SECRET__: JSON.stringify(process.env.SESSION_SECRET || ''),
        __MONGODB_URI__: JSON.stringify(process.env.MONGODB_URI || ''),
        __SERVICE_URL__: JSON.stringify(process.env.SERVICE_URL || ''),
      } : {}),

      // !!! ONLY place INSECURE values here
      __MODE__: JSON.stringify(process.env.MODE || ''),
      __APP_URL__: JSON.stringify(process.env.APP_URL || ''),
    }));

    return config;
  },
};
