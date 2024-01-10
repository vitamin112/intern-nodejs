import {getMediaByAccessToken, getMediaById} from '../services/instagramService';
import {getMedia, syncMedia, updateMedia} from '../repositories/mediaRepository';
import {getSettingById} from '../repositories/settingRepository';
import chunkArray from '../helpers/utils/chunkArray';
import {docSize} from '../const/firestore';
import {getShopInfoByShopDomain} from '../repositories/shopInfoRepository';
import sortByTimeStamp from '../helpers/utils/sortByTimeStamp';
import {getCurrentShop} from '../helpers/auth';

const isExpired = item =>
  item.media_type === 'VIDEO'
    ? Date.now() - item?.updatedAt > 1000 * 60 * 60 * 24 * 3
    : Date.now() - item?.updatedAt > 1000 * 60 * 60 * 24 * 1.5;

const updateDoc = async (doc, accessToken) => {
  const updatedMedia = await Promise.all(
    doc.media.map(async item =>
      isExpired(item)
        ? {
            ...item,
            ...(await getMediaById(accessToken, item.id)),
            updatedAt: Date.now()
          }
        : item
    )
  );
  await updateMedia(doc.id, updatedMedia);
  return {
    ...doc,
    media: updatedMedia
  };
};

export async function handleGetMediaByToken(ctx) {
  const {access_token} = ctx.req.query;
  const media = await getMediaByAccessToken(access_token);

  return (ctx.body = {data: media.data});
}

export async function handleReFresh(ctx) {
  const {token} = ctx.req.query;
  const shopId = getCurrentShop(ctx);

  const media = await getMedia(shopId);

  if (media.flatMap(item => item.media).some(item => isExpired(item))) {
    await Promise.all(
      media.map(async doc => (doc.media.find(isExpired) ? await updateDoc(doc, token) : doc))
    );
  }

  return (ctx.body = {success: true});
}

export async function handleGetMedia(ctx) {
  const {domain} = ctx.query;
  const {shopId} = await getShopInfoByShopDomain(domain);
  const media = await getMedia(shopId);

  if (media.flatMap(item => item.media).some(item => isExpired(item))) {
    const {accessToken} = await getSettingById(shopId);
    const newMedia = await Promise.all(
      media.map(async doc => (doc.media.find(isExpired) ? await updateDoc(doc, accessToken) : doc))
    );

    return (ctx.body = {media: sortByTimeStamp(newMedia.flatMap(item => item.media))});
  }

  return (ctx.body = {media: sortByTimeStamp(media.flatMap(item => item.media))});
}

export async function handleGetNewMedia(ctx) {
  const {token} = ctx.req.query;
  const shopId = getCurrentShop(ctx);
  const oldMedia = await getMedia(shopId);
  const {data} = await getMediaByAccessToken(token);

  const newMedia = data.filter(item =>
    oldMedia
      .flatMap(item => item.media)
      .map(item => item.id)
      .includes(item.id)
      ? false
      : true
  );

  if (newMedia.length > 0) {
    oldMedia.filter(item => item.count < docSize).length > 0
      ? await updateMedia(oldMedia[0].id, [...oldMedia[0].media, ...newMedia])
      : await syncMedia(chunkArray(newMedia, docSize), shopId);
  }

  return (ctx.body = {media: true});
}
