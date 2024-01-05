import {Firestore} from '@google-cloud/firestore';
import {docSize, limitDoc} from '../const/firestore';

const firestore = new Firestore();
/** @type CollectionReference */
const mediaRef = firestore.collection('media');

export async function syncMedia(data, userId) {
  try {
    const Promises = data.map(async (item, index) => {
      const docRef = mediaRef.doc();
      await docRef.set({
        media: item,
        userId,
        updatedAt: Date.now(),
        part: index
      });
    });

    await Promise.all([...Promises]);

    return data;
  } catch (error) {
    console.log(error);
    return {error: 'something went wrong!'};
  }
}

export async function getMedia() {
  try {
    const limit = Math.ceil(limitDoc / docSize);
    const querySnapshot = await mediaRef
      .orderBy('part', 'desc')
      .limit(limit)
      .get();

    return querySnapshot.docs.flatMap(doc => doc.data().media);
  } catch (error) {
    console.log(error);
    return {error: 'something went wrong!'};
  }
}

export async function deleteMedia() {
  try {
    const batch = firestore.batch();

    const querySnapshot = await mediaRef.get();
    const docs = querySnapshot.docs;

    docs.forEach(doc => batch.delete(doc.ref));

    await batch.commit();

    return {success: true};
  } catch (error) {
    console.log(error);
    return {error: 'something went wrong!'};
  }
}
