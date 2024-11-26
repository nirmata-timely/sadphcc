const config = {
  development: {
    API_URL: "http://localhost:5124",
  },
  production: {
    API_URL: "https://darkturquoise-jackal-772652.hostingersite.com/backend",
  },
};

export const API_URL = import.meta.env.PROD
  ? config.production.API_URL
  : config.development.API_URL;
