const isExpired = item =>
  item.media_type === 'VIDEO'
    ? Date.now() - item?.updatedAt > 1000 * 3
    : Date.now() - item?.updatedAt > 1000 * 60 * 60 * 24 * 1.5;

/**
 * @param [] expiredDoc
 * @param [] instagramMedia
 * @param [] firebaseData
 * @returns  {updatedMedia, docToUpdate}
 */
export function handleExpired(expiredDoc = [], instagramMedia = [], firebaseData = []) {
  const docToUpdate = expiredDoc.map(doc => ({
    ...doc,
    media: doc.media.map(item =>
      isExpired(item)
        ? {
            ...item,
            ...instagramMedia.find(media => media.id === item.id),
            updatedAt: Date.now()
          }
        : item
    )
  }));

  const updatedMedia = firebaseData
    .map(item =>
      docToUpdate.find(doc => doc.id === item.id)
        ? docToUpdate.find(doc => doc.id === item.id).media
        : item.media
    )
    .flat();

  return {updatedMedia, docToUpdate};
}
