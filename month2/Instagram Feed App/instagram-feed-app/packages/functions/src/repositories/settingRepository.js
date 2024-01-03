import {Firestore} from '@google-cloud/firestore';
import {settings} from '../const/settings';
const firestore = new Firestore();
/** @type CollectionReference */
const settingRef = firestore.collection('settings');

export async function getSettings() {
  try {
    const querySnapshot = await settingRef.get();
    if (querySnapshot.empty) {
      return {};
    }
    const [doc] = querySnapshot.docs;
    return doc.data();
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function deleteSettings() {
  try {
    const querySnapshot = await settingRef.get();
    if (querySnapshot.empty) {
      return true;
    }
    const [doc] = querySnapshot.docs;
    await doc.ref.delete();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function syncSettings(data) {
  try {
    await settingRef.doc(data.id).set({...settings, ...data});
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function setSettings(data) {
  try {
    await settingRef.doc(data.id).set({...settings, ...data});
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
