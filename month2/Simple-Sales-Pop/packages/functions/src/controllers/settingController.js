import {getCurrentShop} from '../helpers/auth';
import {getShopSettingByShopId, updateShopSetting} from '../repositories/settingRepository';

/**
 * @param ctx
 * @returns {Promise<{settings}>}
 */
export async function getSettings(ctx) {
  const shopId = getCurrentShop(ctx);
  const settings = await getShopSettingByShopId(shopId);
  if (settings) {
    return (ctx.body = {data: settings, success: true});
  }
  return (ctx.body = {error: 'Something went wrong!'});
}

/**
 * @param ctx
 * @returns {Promise<{settings, success, error}>}
 */
export async function updateSettings(ctx) {
  const shopId = getCurrentShop(ctx);
  const rawData = ctx.req.body;
  const updatedSettings = await updateShopSetting(rawData.data, shopId);
  if (updatedSettings) {
    return (ctx.body = {settings: updatedSettings, success: true});
  }
  return (ctx.body = {error: 'Something went wrong!'});
}
