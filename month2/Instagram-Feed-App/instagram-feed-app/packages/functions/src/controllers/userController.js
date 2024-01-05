import {
  generateTokenByCode,
  getMediaByAccessToken,
  getUserByAccessToken
} from '../services/instagramService';
import {getSettings, setSettings, deleteSettings} from '../repositories/settingRepository';
import {getMedia, syncMedia, deleteMedia} from '../repositories/mediaRepository';
import {docSize} from '../const/firestore';

export async function handleAuth(ctx) {
  const {code} = ctx.query;
  const token = await generateTokenByCode(code);

  const [user, media] = await Promise.all([
    getUserByAccessToken(token.access_token),
    getMediaByAccessToken(token.access_token)
  ]);

  function chunkArray(array, chunkSize) {
    const results = [];
    for (let i = array.length; i > 0; i -= chunkSize) {
      results.push(array.slice(Math.max(0, i - chunkSize), i));
    }
    return results;
  }

  await setSettings(user);
  await syncMedia(chunkArray(media.data, docSize), user.id);

  return (ctx.body = {
    data: {user, media: media.data}
  });
}

export async function handleLogout(ctx) {
  const [user, media] = await Promise.all([deleteMedia(), deleteSettings()]);

  return (ctx.body = {
    data: {user, media}
  });
}

export async function handleGetAccount(ctx) {
  const [settings, media] = await Promise.all([getSettings(), getMedia()]);

  return (ctx.body = {
    data: {settings, media}
  });
}

export async function handleGetMediaByToken(ctx) {
  const {access_token} = ctx.req.query;
  const media = await getMediaByAccessToken(access_token);

  return (ctx.body = {data: media.data});
}
