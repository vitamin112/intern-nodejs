import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore/lite";
import { app } from "./dbConfig.js";

const db = getFirestore(app);

const todoRef = collection(db, "todoes");

const getAll = async (limit, sort) => {
  const todoesCol = collection(db, "todoes");
  const todoSnapshot = await getDocs(todoesCol);

  return todoSnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });
};

const getOne = async (id) => {
  try {
    const todoRef = await doc(db, "todoes", id);
    const todoSnap = await getDoc(todoRef);

    return todoSnap.data();
  } catch (error) {
    console.log(error);
    return null;
  }
};

const addNewOne = async (rawData) => {
  try {
    await addDoc(collection(db, "todoes"), rawData);

    return rawData;
  } catch (error) {
    console.log(error);
  }

  return rawData;
};

const delTodo = async (id) => {
  try {
    const todoRef = await doc(db, "todoes", id);
    await deleteDoc(todoRef);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updTodo = async (id, newData) => {
  try {
    const todoRef = doc(db, "todoes", id);

    await updateDoc(todoRef, newData);

    return "success";
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default { getAll, getOne, addNewOne, delTodo, updTodo };
