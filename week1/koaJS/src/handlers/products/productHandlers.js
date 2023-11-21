import {
  addNewOne,
  delProduct,
  getAll,
  getOne,
  updProduct,
} from "../../database/productRepository.js";

const getAllProduct = async (ctx) => {
  try {
    const { limit } = ctx.request.query;
    const { sort } = ctx.request.query;

    const products = await getAll(limit, sort);

    ctx.status = 200;
    ctx.body = {
      data: products,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      data: [],
      message: error.message,
    };
  }
};

const getById = async (ctx) => {
  try {
    const { id } = ctx.params;
    const { fields } = ctx.request.query;
    const fieldsArr = fields ? fields.split(",") : [];

    const product = await getOne(id);

    let result = {};
    fieldsArr.forEach((key) => {
      result[key] = product[key];
    });

    if (product) {
      return (ctx.body = {
        data: fields ? result : product,
      });
    }

    return (ctx.body = {
      success: false,
      message: "can't find product with id " + id,
      data: null,
    });
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      data: [],
      message: error.message,
    });
  }
};

const addNewProduct = async (ctx) => {
  try {
    const rawData = ctx.request.body;

    const products = await addNewOne(rawData);

    if (products) {
      return (ctx.body = {
        data: products,
      });
    }
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      data: [],
      message: error.message,
    });
  }
};

const updateProduct = async (ctx) => {
  try {
    const { id } = ctx.params;
    const rawData = ctx.request.body;

    const result = await updProduct(id, rawData);

    if (result) {
      return (ctx.body = {
        data: result,
      });
    }
  } catch (error) {
    console.log(error);

    ctx.status = 500;
    return (ctx.body = {
      success: false,
      data: [],
      message: error.message,
    });
  }
};

const deleteProduct = async (ctx) => {
  try {
    const { id } = ctx.params;

    const products = await delProduct(id);

    if (products) {
      return (ctx.body = {
        data: products,
      });
    }
  } catch (error) {
    ctx.status = 500;
    return (ctx.body = {
      success: false,
      data: [],
      message: error.message,
    });
  }
};

export default {
  getAllProduct,
  getById,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
