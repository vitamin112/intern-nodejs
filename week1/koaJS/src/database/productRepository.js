import fs from "fs";
import { readFile } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const products = JSON.parse(
  await readFile(__dirname + "/product.json", "utf8")
);

const writeDB = (newData) => {
  fs.writeFileSync(
    __dirname + "/product.json",
    JSON.stringify({
      data: newData,
    })
  );
};

const getAll = (limit, sort) => {
  let productsList = products.data;

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

const getOne = (id) => {
  const product = products.data.find((p) => p.id === id);

  if (!product) {
    throw new Error("Product not found!");
  }

  return product;
};

const addNewOne = async (rawData) => {
  const newProducts = await [...products.data, rawData];

  await writeDB(newProducts);

  return rawData;
};

const delProduct = async (id) => {
  let newProducts = await products.data.filter((product) => product.id !== id);

  await writeDB(newProducts);

  return newProducts;
};

const updProduct = async (id, newData) => {
  let product = await products.data.find((product) => product.id === id);
  if (!product) {
    throw new Error("Product not found!");
  } else {
    let updatedProduct = { ...product, ...newData };

    await writeDB([...products.data, updatedProduct]);

    return updatedProduct;
  }
};

export default { getAll, getOne, addNewOne, delProduct, updProduct };
