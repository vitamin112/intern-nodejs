import cors from '@koa/cors';
import App from 'koa';
import render from 'koa-ejs';
import path from 'path';
import hybridBodyParser from '../middleware/bodyParseMiddleware';
import createErrorHandler from '../middleware/errorHandler';
import router from '../routes/api';
import {handleError} from '../services/errorService';
// Initialize all demand configuration for an application
const api = new App();
api.proxy = true;

render(api, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});

api.use(cors());
api.use(hybridBodyParser());
api.use(router().routes()).use(router().allowedMethods());

api.use(createErrorHandler());

// Handling all errors
api.on('error', handleError);

export default api;
