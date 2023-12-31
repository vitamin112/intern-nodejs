import * as functions from 'firebase-functions';

const {app} = functions.config();

export default {
  isProduction: app.env === 'production',
  baseUrl: app.base_url,
  redirect_uri: app.redirect_uri,
  clientId: app.client_id,
  client_secret: app.client_secret
};
