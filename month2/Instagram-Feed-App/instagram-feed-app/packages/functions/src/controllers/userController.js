import {
  generateTokenByCode,
  getMediaByAccessToken,
  getUserByAccessToken
} from '../services/instagramService';
import {getSettings, setSettings, deleteSettings} from '../repositories/settingRepository';
import {getMedias, syncMedias, deleteMedias} from '../repositories/mediaRepository';
import {getCurrentShop} from '../helpers/auth';
import {syncMetaSetting} from '../services/shopifyService';

export async function handleAuth(ctx) {
  const {code} = ctx.query;
  const token = await generateTokenByCode(code);

  const [user, media] = await Promise.all([
    getUserByAccessToken(token.access_token),
    getMediaByAccessToken(token.access_token)
  ]);

  await setSettings(user);
  await syncMedias(media.data, user.id);

  return (ctx.body = {
    data: {user, media: media.data}
  });
}

export async function handleChangeSettings(ctx) {
  const {data} = ctx.req.body;
  const shopId = getCurrentShop(ctx);

  const settings = await setSettings(data);
  await syncMetaSetting(settings, shopId);
  return (ctx.body = {
    success: true
  });
}

export async function handleLogout(ctx) {
  const [user, media] = await Promise.all([deleteMedias(), deleteSettings()]);

  return (ctx.body = {
    data: {user, media}
  });
}

export async function handleGetAccount(ctx) {
  const [settings, media] = await Promise.all([getSettings(), getMedias()]);

  return (ctx.body = {
    data: {settings, media}
  });
}

export async function handleGetMediaByToken(ctx) {
  const {access_token} = ctx.req.query;
  const medias = await getMediaByAccessToken(access_token);

  return (ctx.body = {data: medias.data});
}

export async function handleGetMedia(ctx) {
  const media = await getMedias();

  return (ctx.body = {media});
}
