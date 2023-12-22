import {createShopifyByShopID} from './shopifyService';

/**
 * @param {*} ctx
 * @return {Promise<void>}
 */

export async function syncMetaSetting(shopId, data) {
  try {
    const shopify = await createShopifyByShopID(shopId);
    const [metafieldSetting] = await shopify.metafield.list({key: 'setting'});
    await shopify.metafield.update(metafieldSetting.id, {value: JSON.stringify(data)});

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
