import admin from "firebase-admin";
import fs from "fs";

const loadJSON = async (path) =>
  await JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
const serviceAccount = await loadJSON("./serviceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const productRef = db.collection("products");

const getData = async () => {
  try {
    const reps = await productRef.get();

    let products = [];
    reps.docs.forEach((item) => {
      products.push(item.data());
    });
    return products;
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (limit, sort) => {
  let productsList = await getData();

  if (limit) {
    productsList = productsList.slice(0, limit);
  }

  if (sort === "desc") {
    return (productsList = productsList.sort((a, b) =>
      a["createdAt"] > b["createdAt"] ? -1 : 1
    ));
  }
  return (productsList = productsList.sort((a, b) =>
    a["createdAt"] < b["createdAt"] ? -1 : 1
  ));
};

const getOne = async (id) => {
  try {
    const reps = await productRef.doc(id);
    const product = await reps.get();

    return product.data();
  } catch (error) {
    console.log(error);
    return null;
  }
};

const addNewOne = async (rawData) => {
  try {
    await productRef.add(rawData);
    return rawData;
  } catch (error) {
    console.log(error);
  }

  return rawData;
};

const delProduct = async (id) => {
  try {
    const product = await productRef.doc(id);
    await product.delete();

    return "success";
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updProduct = async (id, newData) => {
  try {
    const product = await productRef.doc(id);
    await product.update(newData);

    return "success";
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default { getAll, getOne, addNewOne, delProduct, updProduct };
