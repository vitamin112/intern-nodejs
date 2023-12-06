const {bodyParser} = require('@koa/bodyparser');

module.exports = function hybridBodyParser(opts) {
  const bp = bodyParser(opts);
  return async (ctx, next) => {
    ctx.request.body = ctx.request.body || ctx.req.body;
    return bp(ctx, next);
  };
};
