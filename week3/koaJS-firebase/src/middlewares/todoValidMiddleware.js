import yup from "yup";

export const todoValidMiddleware = async (ctx, next) => {
  try {
    const rawData = await ctx.request.body;

    let schema = yup.object().shape({
      id: yup.string().required(),
      name: yup.string().required(),
      price: yup.string().required(),
      description: yup.string().required(),
      product: yup.string().required(),
      color: yup.string().required(),
      createdAt: yup.date().required(),
      image: yup.string().required(),
    });

    await schema.validate(rawData);

    await next();
  } catch (e) {
    console.log(e);
    return (ctx.body = {
      errorName: e.message,
      success: false,
    });
  }
};
