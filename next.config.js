module.exports = {
  webpack: (config, {
    buildId, dev, isServer, defaultLoaders, webpack
  }) => {
    config.plugins.push(new webpack.DefinePlugin({
      __AUTH_SECRET__: JSON.stringify(process.env.AUTH_SECRET || ''),
      __SESSION_SECRET__: JSON.stringify(process.env.SESSION_SECRET || ''),
      __MONGODB_URI__: JSON.stringify(process.env.MONGODB_URI || ''),

      __MODE__: JSON.stringify(process.env.MODE || ''),
      __SERVICE_URL__: JSON.stringify(process.env.SERVICE_URL || ''),
      __APP_URL__: JSON.stringify(process.env.APP_URL || ''),
    }));

    return config;
  },
};
