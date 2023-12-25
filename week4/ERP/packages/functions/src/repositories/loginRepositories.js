import {Firestore} from '@google-cloud/firestore';
/**
 * @documentation
 *
 * Only use one repository to connect to one collection
 * do not connect more than one collection from one repository
 */
const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('employees');

export async function login(data) {
  try {
    /**
     * 1. Thêm điều kiện status vào userRef
     * 2. Xử lý update employee data bằng func editEmployee ở employeeRepository.
     */
    const userRef = await collection.where('email', '==', data.email).get();
    const user = userRef.docs[0]?.data();

    if (user && user.role !== '' && user.status) {
      if (user.avatar === '') {
        /**
         * 1. Return user data luôn ở đây
         */
        await collection.doc(userRef.docs[0].id).update({avatar: data.avatar});
      }
      /**
       * đoạn này return user không cần check lại avatar
       */
      return {...user, avatar: user.avatar === '' ? data.avatar : user.avatar};
    }
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
