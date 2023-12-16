import createErrorHandler from '@functions/middleware/errorHandler';
import webhookRouter from '@functions/routes/webhook';
import App from 'koa';
import * as errorService from '@functions/services/errorService';

// Initialize all demand configuration for an application
const webhook = new App();
webhook.proxy = true;

webhook.use(createErrorHandler());

const router = webhookRouter();
// Register all routes for the application
webhook.use(router.allowedMethods());
webhook.use(router.routes());

// Handling all errors
webhook.on('error', errorService.handleError);

export default webhook;
