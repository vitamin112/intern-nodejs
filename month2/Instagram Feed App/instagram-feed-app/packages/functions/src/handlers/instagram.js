import instaAuthRouter from '@functions/routes/instagram';
import App from 'koa';
import * as errorService from '@functions/services/errorService';
const cors = require('@koa/cors');

// Initialize all demand configuration for an application
const instagram = new App();
instagram.proxy = true;

// instagram.use(createErrorHandler());
instagram.use(cors());
const router = instaAuthRouter();
// Register all routes for the application
instagram.use(router.allowedMethods());
instagram.use(router.routes());

// Handling all errors
instagram.on('error', errorService.handleError);

export default instagram;
