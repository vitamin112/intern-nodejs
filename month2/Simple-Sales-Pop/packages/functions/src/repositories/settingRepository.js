import {presentDataAndFormatDate} from '@avada/firestore-utils';
import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
/** @type CollectionReference */
const shopSettingRef = firestore.collection('shopSettings');

/**
 * Get shop setting by given shop ID
 *
 * @param {string} id
 * @return {Promise<FirebaseFirestore.DocumentData>}
 */
export async function getShopSettingByShopId(id) {
  try {
    const docs = await shopSettingRef
      .where('shopId', '==', id)
      .limit(1)
      .get();
    if (docs.empty) {
      return null;
    }
    const [doc] = docs.docs;
    return presentDataAndFormatDate(doc);
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * update shop setting
 *
 * @param {Object} data
 * @return {Promise<FirebaseFirestore.DocumentData>}
 */
export async function updateShopSetting(data, id) {
  try {
    const docs = await shopSettingRef
      .where('shopId', '==', id)
      .limit(1)
      .get();
    if (docs.empty) {
      return null;
    }
    const [doc] = docs.docs;
    await doc.ref.set(data);
    return presentDataAndFormatDate(doc);
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * create shop setting
 *
 * @param {Object} data
 * @return {Promise<FirebaseFirestore.DocumentData>}
 */
export async function createShopSetting(data, id) {
  try {
    const doc = shopSettingRef.doc();
    await doc.set({...data, shopId: id});
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}
