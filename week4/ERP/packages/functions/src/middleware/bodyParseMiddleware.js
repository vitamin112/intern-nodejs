import {bodyParser} from '@koa/bodyparser';

export default function hybridBodyParser(opts) {
  const bp = bodyParser(opts);
  return async (ctx, next) => {
    ctx.request.body = ctx.request.body || ctx.req.body;
    return bp(ctx, next);
  };
}
