import appRoute from '@assets/const/app';

export const isEmbeddedApp = process.env.IS_EMBEDDED_APP === 'yes';
export const clientId = process.env.CLIENT_ID;
export const baseUrl = process.env.HOST;
export const redirect_uri = process.env.REDIRECT_URI;
export const clientSecret = process.env.CLIENT_SECRET;
export const routePrefix = isEmbeddedApp ? appRoute.embed : appRoute.standalone;
export const prependRoute = url => routePrefix + url;
export const removeRoute = url => (isEmbeddedApp ? url.replace(routePrefix, '') : url);
