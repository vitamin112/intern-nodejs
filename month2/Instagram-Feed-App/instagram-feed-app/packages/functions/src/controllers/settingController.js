import {getSettings, setSettings} from '../repositories/settingRepository';
import {getCurrentShop} from '../helpers/auth';
import {syncMetaSetting} from '../services/shopifyService';

export async function handleChangeSettings(ctx) {
  const {data} = ctx.req.body;
  const shopId = getCurrentShop(ctx);

  const settings = await setSettings(data);
  await syncMetaSetting(settings, shopId);
  return (ctx.body = {
    success: true
  });
}

export async function handleGetSetting(ctx) {
  const settings = await getSettings();

  return (ctx.body = {
    data: {settings}
  });
}
