import {getShopById} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';
import {getCurrentShop} from '../helpers/auth';
/**
 * @param ctx
 * @returns {Promise<{shop, shopInfo: *}>}
 */
export async function getUserShops(ctx) {
  const shopId = getCurrentShop(ctx);
  const shopData = await getShopById(shopId);

  const shopify = new Shopify({
    accessToken: shopData.accessToken,
    shopName: shopData.shopifyDomain
  });

  const order = await shopify.order.list({status: 'any'});

  ctx.body = {data: order, success: true};
}
