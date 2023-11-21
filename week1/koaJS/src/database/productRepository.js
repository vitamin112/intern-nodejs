import fs from "fs";
import { readFile } from "fs/promises";

let products = JSON.parse(await readFile("src/database/product.json", "utf8"));

export const getAll = (limit, sort) => {
  let productsList = products.data;

  if (limit) {
    productsList = productsList.slice(0, limit);
  }

  if (sort === "desc") {
    productsList = productsList.sort((a, b) => {
      if (a["createdAt"] > b["createdAt"]) {
        return -1;
      }
      if (a["createdAt"] < b["createdAt"]) {
        return 1;
      }
      return 0;
    });
  } else {
    productsList = productsList.sort((a, b) => {
      if (a["createdAt"] < b["createdAt"]) {
        return -1;
      }
      if (a["createdAt"] > b["createdAt"]) {
        return 1;
      }
      return 0;
    });
  }

  return productsList;
};

export const getOne = (id) => {
  const product = products.data.find((p) => p.id === id);

  return product;
};

export const addNewOne = (rawData) => {
  let newProducts = [...products.data, rawData];

  fs.writeFileSync(
    "./src/database/product.json",
    JSON.stringify({
      data: newProducts,
    })
  );

  return newProducts;
};

export const delProduct = (id) => {
  let newProducts = products.data.filter((product) => product.id !== id);

  fs.writeFileSync(
    "./src/database/product.json",
    JSON.stringify({
      data: newProducts,
    })
  );

  return newProducts;
};

export const updProduct = (id, newData) => {
  let product = products.data.find((product) => product.id === id);

  if (!product) {
    throw new Error("Product not found!");
  } else {
    let updatedProduct = { ...product, ...newData };

    let updatedProducts = [...products.data, updatedProduct];

    fs.writeFileSync(
      "./src/database/product.json",
      JSON.stringify({
        data: updatedProducts,
      })
    );

    return updatedProduct;
  }
};
