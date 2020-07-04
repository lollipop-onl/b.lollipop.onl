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
};
