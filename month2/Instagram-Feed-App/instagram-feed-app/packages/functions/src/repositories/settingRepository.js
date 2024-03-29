import {Firestore} from '@google-cloud/firestore';
import {settings} from '../const/settings';

const firestore = new Firestore();
/** @type CollectionReference */
const settingRef = firestore.collection('settings');

export async function getSettings(shopId) {
  try {
    const querySnapshot = await settingRef.where('shopId', '==', shopId).get();
    if (querySnapshot.empty) {
      return {error: 'Not found!'};
    }
    const [doc] = querySnapshot.docs;
    return doc.data();
  } catch (error) {
    console.log(error);
    return {error: 'Something went wrong!'};
  }
}

export async function getSettingById(id) {
  try {
    const querySnapshot = await settingRef.where('shopId', '==', id).get();
    if (querySnapshot.empty) {
      return {error: 'Not found!'};
    }
    const [doc] = querySnapshot.docs;
    return doc.data();
  } catch (error) {
    console.log(error);
    return {error: 'Something went wrong!'};
  }
}

export async function deleteSettings(shopId) {
  try {
    const querySnapshot = await settingRef.where('shopId', '==', shopId).get();
    if (querySnapshot.empty) {
      return {error: 'Not found!'};
    }
    const [doc] = querySnapshot.docs;
    await doc.ref.delete();
    return {success: true};
  } catch (error) {
    console.log(error);
    return {error: 'something went wrong!'};
  }
}

export async function syncSettings(data) {
  try {
    await settingRef.doc(data.shopId).update({accessToken: data.accessToken, lastSync: Date.now()});
    return {success: true};
  } catch (error) {
    console.log(error);
    return {error: 'something went wrong!'};
  }
}

export async function setSettings(data) {
  try {
    await settingRef.doc(data.shopId).set({...settings, ...data});
    return {...settings, ...data};
  } catch (error) {
    console.log(error);
    return {error: 'something went wrong!'};
  }
}
