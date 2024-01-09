import {getMediaByAccessToken, getMediaById} from '../services/instagramService';
import {getMedia, syncMedia, updateMedia} from '../repositories/mediaRepository';
import {getSettingById} from '../repositories/settingRepository';
import chunkArray from '../helpers/utils/chunkArray';
import {docSize} from '../const/firestore';
import {getShopInfoByShopDomain} from '../repositories/shopInfoRepository';
import sortByTimeStamp from '../helpers/utils/sortByTimeStamp';

export async function handleGetMediaByToken(ctx) {
  const {access_token} = ctx.req.query;
  const media = await getMediaByAccessToken(access_token);

  return (ctx.body = {data: media.data});
}

export async function handleReFresh(ctx) {
  const {token} = ctx.req.query;

  const media = await getMediaByAccessToken(token);

  return (ctx.body = {data: media?.data});
}

export async function handleGetMedia(ctx) {
  const {domain} = ctx.query;
  const {shopId} = await getShopInfoByShopDomain(domain);
  const media = await getMedia(shopId);

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

  if (media.flatMap(item => item.media).some(item => isExpired(item))) {
    const {accessToken} = await getSettingById(shopId);
    const newMedia = await Promise.all(
      media.map(async doc => (doc.media.find(isExpired) ? await updateDoc(doc, accessToken) : doc))
    );

    return (ctx.body = {media: sortByTimeStamp(newMedia.flatMap(item => item.media))});
  }

  return (ctx.body = {media: sortByTimeStamp(media.flatMap(item => item.media))});
}
