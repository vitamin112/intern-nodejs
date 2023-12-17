import {presentDataAndFormatDate, presentDataFromDoc} from '@avada/firestore-utils';
import {Firestore} from '@google-cloud/firestore';
import Shopify from 'shopify-api-node';

const firestore = new Firestore();
/** @type CollectionReference */
const notificationRef = firestore.collection('notifications');

/**
 * Get shop notifications by given shop ID
 *
 * @param {string} id
 * @return {Promise<FirebaseFirestore.DocumentData>}
 */
export async function getNotificationsByShopId(
  id,
  {limit = 30, page = 1, searchKey = '', sort = 'timestamp:desc'}
) {
  try {
    const [sortValue, sortOptions] = sort.split(':');
    const shopSnap = await notificationRef.where('shopId', '==', id);

    const docs = await shopSnap
      .orderBy(sortValue, sortOptions ? sortOptions : 'desc')
      .limit(limit ? +limit : 30)
      .offset((page - 1) * limit)
      .get();

    const countQuery = await shopSnap.count().get();
    const totalPage = Math.ceil((await countQuery.data().count) / limit);

    const pageInfo = {hasPre: +page <= 1, hasNext: totalPage <= +page};
    if (docs.empty) {
      return null;
    }
    return {notifications: docs.docs.map(doc => presentDataFromDoc(doc)), pageInfo};
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * create default notification
 *
 * @param {Object} data
 * @return {Promise<FirebaseFirestore.DocumentData>}
 */
export async function createNotifications(data) {
  const batch = firestore.batch();
  try {
    const docRef = notificationRef.doc();
    batch.set(docRef, item);

    await batch.commit();

    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * create new notification
 *
 * @param {Object} data
 * @return {Promise<FirebaseFirestore.DocumentData>}
 */
export async function createNewNotification(data) {
  try {
    await notificationRef.doc().set(data);

    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}
