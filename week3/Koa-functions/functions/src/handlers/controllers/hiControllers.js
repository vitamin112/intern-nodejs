const sayHi = async (ctx) => {
  return (ctx.body = {
    Message: "Hi",
  });
};

module.exports = {
  sayHi,
};
