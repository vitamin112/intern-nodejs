import Router from 'koa-router';
import * as sampleController from '@functions/controllers/sampleController';
import * as shopController from '@functions/controllers/shopController';
import * as subscriptionController from '@functions/controllers/subscriptionController';
import * as appNewsController from '@functions/controllers/appNewsController';
import * as userController from '@functions/controllers/userController';
import * as settingController from '@functions/controllers/settingController';
import {getApiPrefix} from '@functions/const/app';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});

  router.get('/samples', sampleController.exampleAction);
  router.get('/shops', shopController.getUserShops);
  router.get('/subscription', subscriptionController.getSubscription);
  router.get('/appNews', appNewsController.getList);
  router.get('/appNews', appNewsController.getList);

  router.get('/account', userController.handleGetAccount);
  router.put('/settings', settingController.handleChangeSettings);
  router.get('/settings', settingController.handleGetSetting);
  router.delete('/logout', userController.handleLogout);
  return router;
}
