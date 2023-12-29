import instaAuthRouter from '@functions/routes/instaAuth';
import App from 'koa';
import * as errorService from '@functions/services/errorService';
const cors = require('@koa/cors');

// Initialize all demand configuration for an application
const instaAuth = new App();
instaAuth.proxy = true;

// instaAuth.use(createErrorHandler());
instaAuth.use(cors());
const router = instaAuthRouter();
// Register all routes for the application
instaAuth.use(router.allowedMethods());
instaAuth.use(router.routes());

// Handling all errors
instaAuth.on('error', errorService.handleError);

export default instaAuth;
