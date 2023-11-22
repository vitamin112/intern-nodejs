import productRepository from "../../database/productRepository.js";

const getAllProduct = async (ctx) => {
  try {
    const { limit } = ctx.request.query;
    const { sort } = ctx.request.query;

    const products = await productRepository.getAll(limit, sort);

    ctx.body = {
      data: products,
    };
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: false,
      message: error.message,
    };
  }
};

const getById = async (ctx) => {
  try {
    const { id } = ctx.params;
    const { fields } = ctx.request.query;
    const fieldsArr = fields ? fields.split(",") : [];

    const product = await productRepository.getOne(id);

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
    console.log(error);
    return (ctx.body = {
      success: false,
      message: error.message,
    });
  }
};

const addNewProduct = async (ctx) => {
  try {
    const rawData = await ctx.request.body;

    const product = await productRepository.addNewOne(rawData);
    if (product) {
      ctx.body = {
        data: product,
      };
    }
  } catch (error) {
    console.log(error);
    return (ctx.body = {
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (ctx) => {
  try {
    const { id } = ctx.params;
    const rawData = await ctx.request.body;

    const result = await productRepository.updProduct(id, rawData);

    return (ctx.body = {
      data: result,
    });
  } catch (error) {
    console.log(error);

    return (ctx.body = {
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (ctx) => {
  try {
    const { id } = ctx.params;

    const products = await productRepository.delProduct(id);

    if (products) {
      return (ctx.body = {
        data: products,
      });
    }
  } catch (error) {
    console.log(error);

    return (ctx.body = {
      success: false,
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
