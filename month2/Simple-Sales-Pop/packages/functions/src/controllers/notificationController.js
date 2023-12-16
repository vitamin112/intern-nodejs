import {getShopById} from '@avada/shopify-auth';
import {getCurrentUserShopId} from '@avada/shopify-auth/build/authentication';
import Shopify from 'shopify-api-node';
import {getCurrentShop} from '../helpers/auth';
import {getNotificationsByShopId} from '../repositories/notificationRepository';

export async function getNotifications(ctx) {
  const shopId = getCurrentShop(ctx);
  const query = ctx.req.query;

  const {notifications, pageInfo} = await getNotificationsByShopId(shopId, query);

  ctx.body = {data: notifications, success: true, pageInfo};
}

export async function createNotification(ctx) {
  const shopId = getCurrentUserShopId(ctx);
  const shopData = await getShopById(shopId);

  const shopify = new Shopify({
    accessToken: shopData.accessToken,
    shopName: shopData.shopifyDomain
  });

  const order = await shopify.order.list({status: 'any'});

  ctx.body = {data: order, success: true};
}
