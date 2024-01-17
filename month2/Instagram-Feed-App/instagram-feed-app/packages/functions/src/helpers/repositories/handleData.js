/**
 * @param [] instagramData
 * @param [] firebaseData
 * @returns {newMedia, updatedDoc}
 */
export function handleData(instagramData = [], firebaseData = []) {
  const newMedia = instagramData.filter(
    item =>
      !firebaseData
        .flatMap(item => item.media)
        .map(item => item.id)
        .includes(item.id)
  );

  const newMediaIds = instagramData.map(item => item.id);

  const docToUpdate = doc => {
    const media = doc.media.filter(item => newMediaIds.includes(item.id));
    return {
      ...doc,
      media,
      count: media.length
    };
  };

  const docLess = firebaseData
    .map(doc => (doc.media.find(item => !newMediaIds.includes(item.id)) ? docToUpdate(doc) : doc))
    .filter(item => item.count < 4);

  const updatedDoc = [];

  return docLess.reduce(
    (prevAcc, currentValue) => {
      const {newMedia, updatedDoc} = prevAcc;
      const sliceMedia = newMedia.splice(0, 4 - currentValue.count);

      sliceMedia.length
        ? updatedDoc.push({
            ...currentValue,
            media: [...currentValue.media, ...sliceMedia],
            count: currentValue.count + sliceMedia.length
          })
        : updatedDoc.push(currentValue);

      return {newMedia, updatedDoc};
    },
    {newMedia, updatedDoc}
  );
}
