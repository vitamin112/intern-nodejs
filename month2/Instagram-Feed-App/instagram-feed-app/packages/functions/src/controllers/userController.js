import {getSettings, setSettings, syncSettings} from '../repositories/settingRepository';
import {getMedia, syncMedia, deleteMedia} from '../repositories/mediaRepository';
import {docSize} from '../const/firestore';
import chunkArray from '../helpers/utils/chunkArray';
import {getCurrentShop} from '../helpers/auth';
import sortByTimeStamp from '../helpers/utils/sortByTimeStamp';
import Instagram from '../helpers/instagram';
import {setUser} from '../repositories/userRepository';

const instagram = new Instagram();

export async function handleAuth(ctx) {
  const {code, state: shopId} = ctx.query;

  const resp = await instagram.getTokenByCode(code);
  const longLivedTokens = await instagram.getLongLivedTokens(resp.access_token);

  const [user, media] = await Promise.all([
    instagram.getUserByAccessToken(longLivedTokens),
    instagram.getMediaByAccessToken(longLivedTokens)
  ]);

  await Promise.all([
    syncSettings({...user, shopId}),
    syncMedia(chunkArray(media.data, docSize), shopId),
    setUser({...user, shopId})
  ]);

  return (ctx.body = 'Close this window and refresh the page');
}

export async function handleLogout(ctx) {
  const shopId = getCurrentShop(ctx);
  await deleteMedia(shopId);

  return (ctx.body = {success: true});
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
  const media = await instagram.getMediaByAccessToken(access_token);

  return (ctx.body = {data: media.data});
}
