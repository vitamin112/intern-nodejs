import Shopify from 'shopify-api-node';
import {createNewNotification} from '../repositories/notificationRepository';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {getNotification} from '../services/notificationService';

export async function createNotification(ctx) {
  const domain = await ctx.get('X-Shopify-Shop-Domain');
  const shopData = await getShopByShopifyDomain(domain);

  const shopify = new Shopify({
    accessToken: shopData.accessToken,
    shopName: shopData.domain
  });

  const notification = await getNotification(shopify, shopData.id, ctx.req.body);

  await createNewNotification(notification);
  ctx.body = {success: true};
}
