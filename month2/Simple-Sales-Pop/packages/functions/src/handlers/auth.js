import {contentSecurityPolicy, shopifyAuth} from '@avada/shopify-auth';
import appConfig from '@functions/config/app';
import shopifyConfig from '@functions/config/shopify';
import createErrorHandler from '@functions/middleware/errorHandler';
import firebase from 'firebase-admin';
import 'isomorphic-fetch';
import App from 'koa';
import render from 'koa-ejs';
import path from 'path';
import {defaultSettings} from '../const/setting';
import {createNotifications} from '../repositories/notificationRepository';
import {createShopSetting} from '../repositories/settingRepository';
import {getNotifications} from '../services/notificationService';
import {getShopifyShop} from '../services/shopifyService';

if (firebase.apps.length === 0) {
  firebase.initializeApp();
}

// Initialize all demand configuration for an application
const app = new App();
app.proxy = true;

render(app, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
app.use(createErrorHandler());
app.use(contentSecurityPolicy(true));

// Register all routes for the application
app.use(
  shopifyAuth({
    apiKey: shopifyConfig.apiKey,
    firebaseApiKey: shopifyConfig.firebaseApiKey,
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    successRedirect: '/embed',
    initialPlan: {
      id: 'free',
      name: 'Free',
      price: 0,
      trialDays: 0,
      features: {}
    },
    hostName: appConfig.baseUrl,
    isEmbeddedApp: true,
    afterInstall: async ctx => {
      const {shopify, shopData} = await getShopifyShop(ctx);
      const notifications = await getNotifications(shopify, shopData.id);
      await createShopSetting(defaultSettings, shopData.id);
      await createNotifications(notifications);

      await shopify.webhook.create({
        address: 'https://a02d-171-224-180-224.ngrok-free.app',
        topic: 'orders/create',
        format: 'json'
      });

      // await shopify.scriptTag.create({
      //   event: 'onload',
      //   src: 'https://localhost:3000/scripttag/index.min.js'
      // });

      return (ctx.body = {
        success: true
      });
    },
    afterThemePublish: ctx => {
      // Publish assets when theme is published or changed here
      return (ctx.body = {
        success: true
      });
    }
  }).routes()
);

// Handling all errors
app.on('error', err => {
  console.error(err);
});

export default app;
