import {getShopById} from '@avada/shopify-auth';
import {getCurrentUserShopId} from '@avada/shopify-auth/build/authentication';
import Shopify from 'shopify-api-node';

export async function getNotifications(ctx) {
  const shopId = getCurrentUserShopId(ctx);
  const shopData = await getShopById(shopId);

  const shopify = new Shopify({
    accessToken: shopData.accessToken,
    shopName: shopData.shopifyDomain
  });

  const order = await shopify.order.list({status: 'any'});

  ctx.body = {data: order, success: true};
}
