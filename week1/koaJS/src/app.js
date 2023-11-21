import Koa from "koa";
import { koaBody } from "koa-body";
import render from "koa-ejs";
import Router from "koa-router";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { getAll } from "./database/productRepository.js";
import { routes } from "./routes/routes.js";

const router = new Router();
const app = new Koa();
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

render(app, {
  root: `${__dirname}/views`,
  layout: false,
  viewExt: "html",
  cache: false,
});

router.get("/", async (ctx) => {
  const products = await getAll();
  await ctx.render("product", { products });
});

app.use(router.routes()).use(router.allowedMethods());

app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(PORT);
console.log("app listening on port " + PORT);

app.on("error", (err, ctx) => {
  console.log("server error", err, ctx);
});
