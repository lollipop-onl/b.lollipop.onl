require('dotenv').config();

module.exports = {
  env: {
    microCMS_API_KEY: process.env.microCMS_API_KEY
  },
  exportTrailingSlash: true,
  exportPathMap: () => {
    return {
      '/404.html': { page: '/404' },
    }
  },
  webpack: (config) => {
    config.node = {
      fs: 'empty',
      child_process: 'empty',
      net: 'empty',
      dns: 'empty',
      tls: 'empty',
    };

    return config;
  },
};
