import createErrorHandler from '@functions/middleware/errorHandler';
import clientApiRouter from '@functions/routes/clientApi';
import App from 'koa';
import * as errorService from '@functions/services/errorService';

// Initialize all demand configuration for an application
const clientApi = new App();
clientApi.proxy = true;

// clientApi.use(createErrorHandler());

const router = clientApiRouter();
// Register all routes for the application
clientApi.use(router.allowedMethods());
clientApi.use(router.routes());

// Handling all errors
clientApi.on('error', errorService.handleError);

export default clientApi;
