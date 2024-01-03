import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
/** @type CollectionReference */
const mediaRef = firestore.collection('medias');

/**
 * @param data
 * @returns {Promise<{Shop}>}
 */
export async function syncMedia(data) {
  try {
    const batch = firestore.batch();
    data.forEach(item => {
      const docRef = mediaRef.doc(item.id);
      batch.set(docRef, item);
    });
    await batch.commit();

    return true;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function getMedias() {
  try {
    const querySnapshot = await mediaRef
      .orderBy('timestamp')
      .limit(30)
      .get();
    const data = querySnapshot.docs.map(doc => doc.data());
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function deleteMedias() {
  try {
    const batch = firestore.batch();
    const querySnapshot = await mediaRef.get();

    querySnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
