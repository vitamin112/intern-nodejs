import {Firestore} from '@google-cloud/firestore';
import {editEmployee} from './employeeRepository';
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
    const userRef = await collection
      .where('email', '==', data.email)
      .where('status', '==', true)
      .get();
    const user = userRef.docs[0]?.data();

    if (user && user.role !== '') {
      if (user.avatar === '') {
        await editEmployee({...user, avatar: data.avatar});
        return {...user, avatar: data.avatar};
      }
      return user;
    }
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
