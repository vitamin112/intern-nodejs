import {log} from 'firebase-functions/logger';
import {
  generateTokenByCode,
  getMediaByAccessToken,
  getUserByAccessToken
} from '../services/instagramService';
import {createUserSetting} from '../repositories/settingRepository';

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
