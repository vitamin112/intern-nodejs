import {boolean, object, string} from 'yup';

export const validInputMiddleWare = async (ctx, next) => {
  try {
    const rawData = ctx.req.body;

    const schema = object({
      id: string(),
      fullName: string().required(),
      email: string().required(),
      role: string(),
      englishName: string(),
      status: boolean(),
      avatar: string()
    });

    await schema.validate(rawData);
    await next();
  } catch (e) {
    console.log(e);
    return (ctx.body = {
      error: 'Check your input!',
      success: false
    });
  }
};
