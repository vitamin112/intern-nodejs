import {getApiPrefix} from '@functions/const/app';
import * as appNewsController from '@functions/controllers/appNewsController';
import * as notificationController from '@functions/controllers/notificationController';
import * as settingController from '@functions/controllers/settingController';
import * as shopController from '@functions/controllers/shopController';
import * as subscriptionController from '@functions/controllers/subscriptionController';
import Router from 'koa-router';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});

  router.get('/shops', shopController.getUserShops);
  router.get('/subscription', subscriptionController.getSubscription);
  router.get('/appNews', appNewsController.getList);
  router.get('/settings', settingController.getSettings);
  router.put('/settings', settingController.updateSettings);
  router.get('/notifications', notificationController.getNotifications);
  router.put('/republish', settingController.syncSetting);

  return router;
}
