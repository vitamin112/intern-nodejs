import {presentDataFromDoc} from '@avada/firestore-utils';
import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
/** @type CollectionReference */
const notificationRef = firestore.collection('notifications');

/**
 * Get shop notifications by given shop ID
 *
 * @param {string} id
 * @return {Promise<FirebaseFirestore.DocumentData>}
 */
export async function getNotificationsByShopId(id, query) {
  try {
    const {limit = 30, page = 1, searchKey = '', sort = 'timestamp:asc'} = query;

    const [sortValue, sortOptions] = sort.split(':');
    const shopSnap = await notificationRef.where('shopId', '==', id);

    const docs = await shopSnap
      .orderBy(sortValue, sortOptions ? sortOptions : 'asc')
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
    const product = await firestore
      .collection('products')
      .doc(data.line_items[0].product_id)
      .get();
    const img = product.image;

    await notificationRef.doc().set({
      firstName: data.billing_address.first_name || '',
      city: data.billing_address.city || '',
      country: data.billing_address.country || '',
      shopId: id || '',
      timestamp: getFormattedTimestamp(data.created_at) || '',
      productName: data.line_items[0].title || '',
      productId: data.line_items[0].product_id || null,
      productImage: img
    });

    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}
