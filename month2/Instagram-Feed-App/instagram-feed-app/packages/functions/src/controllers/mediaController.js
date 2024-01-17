import {docSize} from '../const/firestore';
import {getCurrentShop} from '../helpers/auth';
import Instagram from '../helpers/instagram';
import {handleData} from '../helpers/repositories/handleData';
import {handleExpired} from '../helpers/repositories/handleExpired';
import chunkArray from '../helpers/utils/chunkArray';
import sortByTimeStamp from '../helpers/utils/sortByTimeStamp';
import {bulkUpdate, getMedia, syncMedia, updateMedia} from '../repositories/mediaRepository';
import {getSettingById} from '../repositories/settingRepository';
import {getShopInfoByShopDomain} from '../repositories/shopInfoRepository';

const instagram = new Instagram();

const isExpired = item =>
  item.media_type === 'VIDEO'
    ? Date.now() - item?.updatedAt > 1000 * 60 * 60 * 24 * 1.5
    : Date.now() - item?.updatedAt > 1000 * 60 * 60 * 24 * 3;

export async function handleGetMediaByToken(ctx) {
  const {access_token} = ctx.req.query;
  const media = await instagram.getMediaByAccessToken(access_token);

  return (ctx.body = {data: media.data});
}

export async function handleGetMedia(ctx) {
  const {domain} = ctx.query;
  const {shopId} = await getShopInfoByShopDomain(domain);
  const media = await getMedia(shopId);

  const expiredDoc = media.filter(item => item.media.find(item => isExpired(item)));

  if (expiredDoc.length) {
    const {accessToken} = await getSettingById(shopId);
    const instagramMedia = await instagram.getMediaByAccessToken(accessToken);
    const {updatedMedia, docToUpdate} = handleExpired(expiredDoc, instagramMedia.data, media);

    await Promise.all(docToUpdate.map(async doc => await updateMedia(doc.id, doc.media)));

    return (ctx.body = {media: sortByTimeStamp(updatedMedia).filter(item => !item.isHide)});
  }

  return (ctx.body = {
    media: sortByTimeStamp(media.flatMap(item => item.media)).filter(item => !item.isHide)
  });
}

export async function handleGetNewMedia(ctx) {
  const {token} = ctx.req.query;
  const shopId = getCurrentShop(ctx);
  const oldMedia = await getMedia(shopId);
  const {data} = await instagram.getMediaByAccessToken(token);

  const {newMedia, updatedDoc} = handleData(data, oldMedia);

  if (newMedia.length) {
    await syncMedia(chunkArray(newMedia, docSize), shopId);
  }

  if (updatedDoc.length) {
    await Promise.all(updatedDoc.map(async doc => await updateMedia(doc.id, doc.media)));
  }

  return (ctx.body = {success: true, data: oldMedia});
}

export async function handleUpdateMedia(ctx) {
  const {data} = ctx.req.body;

  await bulkUpdate(data);

  return (ctx.body = {success: true});
}
