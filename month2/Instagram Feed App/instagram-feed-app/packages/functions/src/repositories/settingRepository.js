import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';
import {log} from 'firebase-functions/logger';

const firestore = new Firestore();
/** @type CollectionReference */
const settingRef = firestore.collection('settings');

/**
 * Get user setting by given user ID
 *
 * @param {string} id
 * @return {Promise<FirebaseFirestore.DocumentData>}
 */
export async function createUserSetting(id, setting) {
  try {
    await settingRef.doc(id).set({id, ...setting});
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
