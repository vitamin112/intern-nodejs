export async function exampleAction(ctx) {
  console.log(ctx);
  return (ctx.body = {ctx, success: true});
}
