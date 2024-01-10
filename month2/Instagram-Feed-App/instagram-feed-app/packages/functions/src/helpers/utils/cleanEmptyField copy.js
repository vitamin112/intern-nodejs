export const isExpired = item =>
  item.media_type === 'VIDEO'
    ? Date.now() - item?.updatedAt > 1000 * 60 * 60 * 24 * 3
    : Date.now() - item?.updatedAt > 1000 * 60 * 60 * 24 * 1.5;

export const updateDoc = async (doc, accessToken) => {
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
