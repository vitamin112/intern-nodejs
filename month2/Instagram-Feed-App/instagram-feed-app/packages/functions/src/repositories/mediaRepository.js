import {Firestore} from '@google-cloud/firestore';
import {docSize, limitDoc} from '../const/firestore';

const firestore = new Firestore();
/** @type CollectionReference */
const mediaRef = firestore.collection('medias');

export async function syncMedias(data, userId) {
  try {
    const writePromises = [];

    for (let i = 0; i < data.length; i += docSize) {
      const docRef = mediaRef.doc();
      const promise = docRef.set({
        media: data.slice(i, i + docSize),
        userId,
        createdAt: new Date()
      });
      writePromises.push(promise);
    }

    await Promise.all(writePromises);

    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function getMedias() {
  try {
    const limit = Math.ceil(limitDoc / docSize);
    const querySnapshot = await mediaRef
      .orderBy('createdAt')
      .limit(limit)
      .get();
    const timeStamps = querySnapshot.docs[0].data().createdAt;

    function isRefresh(timeStamp) {
      const currentTime = Math.floor(Date.now() / 1000);
      const inputTimestamp = timeStamp._seconds;
      const timeDifference = currentTime - inputTimestamp;
      return timeDifference > 10;
    }
    // if (isRefresh(timeStamps)) {
    //   return false;
    // }

    return querySnapshot.docs.flatMap(doc => doc.data().media);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function deleteMedias() {
  try {
    const batch = firestore.batch();

    const querySnapshot = await mediaRef.get();
    const docs = querySnapshot.docs;

    docs.forEach(doc => batch.delete(doc.ref));

    await batch.commit();

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
