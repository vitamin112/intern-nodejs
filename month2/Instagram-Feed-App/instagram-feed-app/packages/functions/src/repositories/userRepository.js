import {Firestore} from '@google-cloud/firestore';
import {docSize, limitDoc} from '../const/firestore';

const firestore = new Firestore();
/** @type CollectionReference */
const userRef = firestore.collection('user');

export async function setUser(data) {
  try {
    await userRef.doc(data.id).set({...data, updatedAt: Date.now()});
    return {success: true};
  } catch (error) {
    console.log(error);
    return {error: 'something went wrong!'};
  }
}

export async function getUserById(id) {
  try {
    const doc = await userRef.doc(id).get();
    return doc.data();
  } catch (error) {
    console.log(error);
    return [];
  }
}
