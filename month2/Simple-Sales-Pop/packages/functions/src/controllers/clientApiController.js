import {getNotificationsByShopId} from '../repositories/notificationRepository';
import {getShopInfoByShopDomain} from '../repositories/shopInfoRepository';

export async function getClientData(ctx) {
  const {domain} = ctx.query;
  const {shopId} = await getShopInfoByShopDomain(domain);
  const {notifications} = await getNotificationsByShopId(shopId, {});
  return (ctx.body = {data: {notifications}, success: true});
}
