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
    /**
     * Check kết quả trả về có item hay ko ở đây: if (querySnapshot.empty), nếu ko trống thì chạy tiếp
     */
    const result = [];
    /**
     * Sử dụng map thay vì forEach
     */
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

export async function importCSV(data) {
  try {
    /**
     * có thể viết func validateCSVFile trong file này luôn hoặc validate trong func này luôn vì validateCSVFile ko sử dụng lại được
     */
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
