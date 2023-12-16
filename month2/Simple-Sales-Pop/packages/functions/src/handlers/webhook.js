import createErrorHandler from '@functions/middleware/errorHandler';
import webhookRouter from '@functions/routes/webhook';
import * as errorService from '@functions/services/errorService';
import App from 'koa';
import render from 'koa-ejs';
import path from 'path';

// Initialize all demand configuration for an application
const webhook = new App();
webhook.proxy = true;

render(webhook, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});

webhook.use(createErrorHandler());

const router = webhookRouter();
// Register all routes for the application
webhook.use(router.allowedMethods());
webhook.use(router.routes());

// Handling all errors
webhook.on('error', errorService.handleError);

export default webhook;
