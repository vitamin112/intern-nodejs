import yup from "yup";

export const bookInputMiddleware = async (ctx, next) => {
  try {
    const rawData = ctx.request.body;

    let schema = yup.object().shape({
      id: yup.number().positive().integer().required(),
      name: yup.string().required(),
      author: yup.string().required(),
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
