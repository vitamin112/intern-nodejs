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

export async function createShopifyByShopID(id) {
  const shopData = await getShopById(id);

  return new Shopify({
    accessToken: shopData.accessToken,
    shopName: shopData.shopifyDomain
  });
}

export async function updateWebhookByTopic(shopId, url, topic) {
  try {
    const shopData = await getShopById(shopId);

    const shopify = new Shopify({
      accessToken: shopData.accessToken,
      shopName: shopData.shopifyDomain
    });

    const [webhook] = await shopify.webhook.list({topic});
    await shopify.webhook.update(webhook.id, {address: `https://${url}/webhook/newOrder`});

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
