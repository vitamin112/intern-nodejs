import {
  getTokenByCode,
  getMediaByAccessToken,
  getUserByAccessToken
} from '../services/instagramService';
import {getSettings, setSettings, deleteSettings} from '../repositories/settingRepository';
import {getMedia, syncMedia, deleteMedia} from '../repositories/mediaRepository';
import {docSize} from '../const/firestore';
import chunkArray from '../helpers/utils/chunkArray';
import {getCurrentShop} from '../helpers/auth';
import sortByTimeStamp from '../helpers/utils/sortByTimeStamp';

export async function handleAuth(ctx) {
  const {code, state: shopId} = ctx.query;

  const token = await getTokenByCode(code);

  const [user, media] = await Promise.all([
    getUserByAccessToken(token.access_token),
    getMediaByAccessToken(token.access_token)
  ]);

  await setSettings({...user, shopId});
  await syncMedia(chunkArray(media.data, docSize), shopId);

  return (ctx.body = 'Close this window and refresh the page');
}

export async function handleLogout(ctx) {
  const shopId = getCurrentShop(ctx);
  const [user, media] = await Promise.all([deleteMedia(shopId), deleteSettings(shopId)]);

  return (ctx.body = {
    data: {user, media}
  });
}

export async function handleGetAccount(ctx) {
  const shopId = getCurrentShop(ctx);

  const [settings, media] = await Promise.all([getSettings(shopId), getMedia(shopId)]);

  return (ctx.body = {
    data: {
      settings,
      media: sortByTimeStamp(
        media.flatMap(doc => doc.media.map(item => ({...item, docId: doc.id})))
      )
    }
  });
}

export async function handleGetMediaByToken(ctx) {
  const {access_token} = ctx.req.query;
  const media = await getMediaByAccessToken(access_token);

  return (ctx.body = {data: media.data});
}
