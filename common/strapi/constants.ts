const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const SITE_URL = IS_PRODUCTION
    ? 'https://transport.ekaterinburg.city'
    : `http://localhost:${process.env.PORT || 3000}`;

export const TRANSPORT_API_URL = IS_PRODUCTION
? 'https://transport-api.ekaterinburg.city'
: `http://localhost:${process.env.APP_PORT || 3080}`;

export const STRAPI_URL = 'https://transport-cms.ekaterinburg.city';
export const TILE_SERVER_URL = 'https://tiles.ekaterinburg.city';
export const TRAFFIC_JAMS_URL = 'https://ekb-probki.vercel.app/api';

// email of Authenticated User
export const EMAIL = process.env.STRAPI_EMAIL;
// password of Authenticated User
export const PASSWORD = process.env.STRAPI_PASSWORD;
// pagination size to request all of the data from table
export const REQUEST_PAGINATION_SIZE = 400;
