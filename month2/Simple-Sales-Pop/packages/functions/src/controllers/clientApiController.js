import {getNotificationsByShopId} from '../repositories/notificationRepository';
import {getShopSettingByShopId} from '../repositories/settingRepository';
import {getShopInfoByShopDomain} from '../repositories/shopInfoRepository';
import {getNotifications} from '../services/notificationService';

export async function getClientData(ctx) {
  const {domain} = ctx.query;
  const {shopId} = await getShopInfoByShopDomain(domain);
  const setting = await getShopSettingByShopId(shopId);
  const {notifications} = await getNotificationsByShopId(shopId, {});
  ctx.body = {data: {setting, notifications}, success: true};
}
