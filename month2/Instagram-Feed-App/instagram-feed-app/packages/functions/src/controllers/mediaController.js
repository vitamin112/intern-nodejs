import {getMediaByAccessToken} from '../services/instagramService';
import {getMedia} from '../repositories/mediaRepository';

export async function handleGetMediaByToken(ctx) {
  const {access_token} = ctx.req.query;
  const media = await getMediaByAccessToken(access_token);

  return (ctx.body = {data: media.data});
}

export async function handleGetMedia(ctx) {
  const media = await getMedia();

  return (ctx.body = {media});
}
