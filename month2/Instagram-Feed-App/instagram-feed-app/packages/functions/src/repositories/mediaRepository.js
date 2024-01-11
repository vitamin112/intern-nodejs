import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
/** @type CollectionReference */
const mediaRef = firestore.collection('media');

export async function syncMedia(data, shopId) {
  try {
    const batch = firestore.batch();
    data.map(async item => {
      const docRef = mediaRef.doc();
      await docRef.set({
        media: item.map(item => ({...item, updatedAt: Date.now()})),
        shopId,
        count: item.length
      });
    });

    await batch.commit();
    return data;
  } catch (error) {
    console.log(error);
    return {error: 'something went wrong!'};
  }
}

export async function getMedia(shopId) {
  try {
    const querySnapshot = await mediaRef.where('shopId', '==', shopId).get();

    return querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function updateMedia(docId, media) {
  try {
    await mediaRef.doc(docId).update({media, count: media.length});
  } catch (error) {
    console.log(error);
    return {error: 'something went wrong!'};
  }
}

export async function deleteMedia(shopId) {
  try {
    const batch = firestore.batch();

    const querySnapshot = await mediaRef.where('shopId', '==', shopId).get();
    const docs = querySnapshot.docs;

    docs.forEach(doc => batch.delete(doc.ref));

    await batch.commit();

    return {success: true};
  } catch (error) {
    console.log(error);
    return {error: 'something went wrong!'};
  }
}
