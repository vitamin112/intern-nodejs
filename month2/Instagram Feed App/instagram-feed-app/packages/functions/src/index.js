import * as functions from 'firebase-functions';
import apiHandler from './handlers/api';
import apiSaHandler from './handlers/apiSa';
import authSaHandler from './handlers/authSa';
import instaAuthHandler from './handlers/instaAuth';
import authHandler from './handlers/auth';

export const api = functions.https.onRequest(apiHandler.callback());
export const apiSa = functions.https.onRequest(apiSaHandler.callback());

export const auth = functions.https.onRequest(authHandler.callback());
export const authSa = functions.https.onRequest(authSaHandler.callback());
export const instaAuth = functions.https.onRequest(instaAuthHandler.callback());
