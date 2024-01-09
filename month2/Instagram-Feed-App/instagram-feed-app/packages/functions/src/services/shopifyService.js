import {getShopById} from '@avada/shopify-auth';
import Shopify from 'shopify-api-node';

export async function syncMetaSetting(data, shopId) {
  try {
    const shopData = await getShopById(shopId);

    const shopify = new Shopify({
      accessToken: shopData.accessToken,
      shopName: shopData.shopifyDomain
    });

    const [metafieldSetting] = await shopify.metafield.list({key: 'setting'});
    await shopify.metafield.update(metafieldSetting.id, {value: JSON.stringify(data)});

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
