import {Firestore} from '@google-cloud/firestore';
import {settings} from '../const/settings';
const firestore = new Firestore();
/** @type CollectionReference */
const settingRef = firestore.collection('settings');

/**
 * @returns {Promise<{Settings}>}
 */
export async function getSettings() {
  const querySnapshot = await settingRef.get();
  if (querySnapshot.empty) {
    return {};
  }
  const [doc] = querySnapshot.docs;
  return doc.data();
}

/**
 * @param data
 * @returns {Promise<{Shop}>}
 */
export async function syncSetting(data) {
  try {
    const doc = await settingRef.doc(data.id).set({...settings, ...data});
    return doc;
  } catch (error) {
    console.log(error);
    return {};
  }
}
