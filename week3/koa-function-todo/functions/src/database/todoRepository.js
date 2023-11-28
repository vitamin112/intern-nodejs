const app = require('./dbConfig.js');

const db = app.firestore();

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
    return 'something went wrong!';
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
    return 'Something went wrong!';
  }
};

const addNewOne = async ({todo}) => {
  try {
    console.log(todo);
    const todoRef = await db
      .collection('todoes')
      .add({todo, isComplete: false});

    return {
      id: todoRef.id,
      todo,
      isComplete: false,
    };
  } catch (error) {
    console.log(error);
    return 'Something went wrong!';
  }
};

const delTodo = async (id) => {
  try {
    const todoRef = await db.collection('todoes').doc(id).delete();

    if (todoRef) {
      return id;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateTodo = async (id) => {
  try {
    const todoRef = await db.collection('todoes').doc(id);
    if (todoRef) {
      await todoRef.update({isComplete: true});
    }

    return 'success';
  } catch (error) {
    console.log(error);
    return 'update failed';
  }
};

module.exports = {getAll, getOne, addNewOne, delTodo, updateTodo};
