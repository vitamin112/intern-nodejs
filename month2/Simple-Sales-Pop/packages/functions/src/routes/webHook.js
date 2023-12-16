import * as notificationController from '@functions/controllers/notificationController';
import Router from 'koa-router';

export default function webhookRouter() {
  const router = new Router({prefix: '/webhook'});

  router.get('/newOrder', notificationController.getNotifications);

  return router;
}
