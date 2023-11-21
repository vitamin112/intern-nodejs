import yup from "yup";

export const productUpdateValidMiddleware = async (ctx, next) => {
  try {
    const rawData = ctx.request.body;

    let schema = yup.object().shape({
      id: yup.string(),
      name: yup.string(),
      price: yup.string(),
      description: yup.string(),
      product: yup.string(),
      color: yup.string(),
      createdAt: yup.date(),
      image: yup.string(),
    });

    await schema.validate(rawData);
    next();
  } catch (e) {
    return (ctx.body = {
      error: e.error,
      errorName: e.name,
      success: false,
    });
  }
};
