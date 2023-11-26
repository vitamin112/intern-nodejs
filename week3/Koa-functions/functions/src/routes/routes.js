const Router = require("koa-router");
const { sayHi } = require("../handlers/controllers/hiControllers");

const router = new Router({
  prefix: "/api",
});

router.get("/", sayHi);

module.exports = router;
