import app from '../config/app';
import {getCurrentShop} from '../helpers/auth';
import {getShopSettingByShopId, updateShopSetting} from '../repositories/settingRepository';
import {syncMetaSetting} from '../services/settingService';
import {updateWebhookByTopic} from '../services/shopifyService';

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
  await syncMetaSetting(shopId, updatedSettings);
  if (updatedSettings) {
    return (ctx.body = {settings: updatedSettings, success: true});
  }
  return (ctx.body = {error: 'Something went wrong!'});
}

export async function syncSetting(ctx) {
  const baseUrl = app.baseUrl;
  const topic = 'orders/create';
  const shopId = getCurrentShop(ctx);
  const updatedSettings = ctx.req.body;

  await syncMetaSetting(shopId, updatedSettings);
  await updateWebhookByTopic(shopId, baseUrl, topic);

  if (updatedSettings) {
    return (ctx.body = {success: true});
  }
  return (ctx.body = {error: 'Something went wrong!'});
}
