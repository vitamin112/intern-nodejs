import {
  generateTokenByCode,
  getMediaByAccessToken,
  getUserByAccessToken
} from '../services/instagramService';
import {
  createUserSetting,
  getSettings,
  setSettings,
  deleteSettings
} from '../repositories/settingRepository';
import {getMedias, syncMedia, deleteMedias} from '../repositories/mediaRepository';
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
  await syncMedia(media.data, user.id);
  await syncMedia(media.data, user.id);

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

export async function connectInstagram(ctx) {
  const {data} = ctx.req.body;
  const token = await generateTokenByCode(data);

  const [user, media] = await Promise.all([
    getUserByAccessToken(token.access_token),
    getMediaByAccessToken(token.access_token)
  ]);
  await createUserSetting(user.id, {message: 'test'});

  return (ctx.body = {
    data: {user: {...user, access_token: token.access_token}, media: media.data}
  });
}

export async function handleGetMedia(ctx) {
  const {access_token} = ctx.req.query;
  const medias = await getMediaByAccessToken(access_token);

  return (ctx.body = {data: medias.data});
}
