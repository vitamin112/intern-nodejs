import {Firestore} from '@google-cloud/firestore';
import {validateCSVFile} from '../helpers/validateCSVFile';
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

export async function createEmployee(data) {
  try {
    const userRef = await collection.add(data);

    return {...data, id: userRef.id};
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function deleteEmployee(id) {
  try {
    await collection.doc(id).delete();

    return id;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function deleteEmployeeBulk(ids) {
  const batch = firestore.batch();

  try {
    const result = ids.map(id => {
      const docRef = collection.doc(id);
      batch.delete(docRef);
    });

    await batch.commit();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function editEmployee(data) {
  try {
    const userRef = await collection.doc(data.id).set({...data});
    console.log(userRef);
    return {...data};
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

export async function importCSV(data) {
  try {
    data = validateCSVFile(data);

    const batch = firestore.batch();
    const result = data.map(item => {
      const docRef = collection.doc();
      batch.set(docRef, item);
      return {...item, id: docRef.id};
    });
    await batch.commit();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
