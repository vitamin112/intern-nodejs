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

export async function getEmployees() {
  try {
    const querySnapshot = await collection.get();

    const result = [];
    querySnapshot.forEach(doc => {
      result.push({...doc.data(), id: doc.id});
    });

    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}
/**
 * @param {string} id
 * @returns {Object}
 */
export async function getEmployeeById(id) {
  try {
    const doc = await collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return {id: doc.id, ...doc.data()};
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * @param {string} email
 * @returns {Object}
 */
export async function getEmployeeByEmail(email) {
  try {
    const userRef = await collection.where('email', '==', email).get();
    const user = userRef.docs[0]?.data();

    return user ? user : null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * @param {Object} data
 * @returns {Object}
 */
export async function create(data) {
  try {
    const userRef = await collection.add(data);

    return {...data, id: userRef.id};
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function login(data) {
  try {
    const userRef = await collection.where('email', '==', data.email).get();
    const user = userRef.docs[0]?.data();

    if (user && user.role !== '' && user.status) {
      if (user.avatar === '') {
        await collection.doc(userRef.docs[0].id).update({avatar: data.avatar});
      }
      return {...user, avatar: user.avatar === '' ? data.avatar : user.avatar};
    }
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}
