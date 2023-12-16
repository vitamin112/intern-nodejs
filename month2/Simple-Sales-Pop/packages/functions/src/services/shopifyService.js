import {getShopById, getShopByShopifyDomain} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';

/**
 * @param {*} ctx
 * @return {Promise<void>}
 */

export async function getShopifyShop(ctx) {
  const shopDomain = ctx.state.shopify.shop;
  const {id} = await getShopByShopifyDomain(shopDomain);
  const shopData = await getShopById(id);

  const shopify = new Shopify({
    accessToken: shopData.accessToken,
    shopName: shopData.shopifyDomain
  });

  return {shopify, shopData};
}
