import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
/** @type CollectionReference */
const mediaRef = firestore.collection('medias');

/**
 * @param data
 * @returns {Promise<{Shop}>}
 */
export async function syncMedia(data, userId) {
  try {
    await mediaRef.doc(userId).set({media: data});

    return true;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function getMedias() {
  try {
    const querySnapshot = await mediaRef.get();
    const [data] = querySnapshot.docs.map(doc => doc.data());

    return data.media;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function deleteMedias() {
  try {
    const querySnapshot = await mediaRef.get();
    const [doc] = querySnapshot.docs;
    await doc.ref.delete();

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
