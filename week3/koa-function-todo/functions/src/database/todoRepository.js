const {doc, deleteDoc, updateDoc} = require('@firebase/firestore');
const key = require('./key.json');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(key),
});

const db = admin.firestore();

const getAll = async () => {
  try {
    const todoes = await db.collection('todoes');
    const querySnapshot = await todoes.get();

    return querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getOne = async (id) => {
  try {
    const todoRef = await db.collection('todoes').doc(id);
    const todoSnap = await todoRef.get();

    if (todoSnap.exists) {
      return {
        id: todoSnap.id,
        ...todoSnap.data(),
      };
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const addNewOne = async (rawData) => {
  try {
    await db.collection('todoes').add(rawData);

    // const todo = await todoRef.get();

    return {
      // id: todo.id,
      // ...todo.data(),
      menubar: 'addNewOne',
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const delTodo = async (id) => {
  try {
    const todoRef = await doc(db, 'todoes', id);
    await deleteDoc(todoRef);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updTodo = async (id, newData) => {
  try {
    const todoRef = doc(db, 'todoes', id);

    await updateDoc(todoRef, newData);

    return 'success';
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {getAll, getOne, addNewOne, delTodo, updTodo};
