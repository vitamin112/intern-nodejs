import {log} from 'firebase-functions/logger';
import {
  generateTokenByCode,
  getMediaByAccessToken,
  getUserByAccessToken
} from '../services/instagramService';
import {createUserSetting, getSettings, syncSetting} from '../repositories/settingRepository';
import {createUser} from '../repositories/userRepository';
import {getMedias, syncMedia} from '../repositories/mediaRepository';

export async function handleAuth(ctx) {
  const {code} = ctx.query;
  const token = await generateTokenByCode(code);

  const [user, media] = await Promise.all([
    getUserByAccessToken(token.access_token),
    getMediaByAccessToken(token.access_token)
  ]);

  await syncSetting(user);
  await syncMedia(media.data);

  return (ctx.body = {
    data: {user, media: media.data}
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
