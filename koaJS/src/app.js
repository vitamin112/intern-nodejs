import Koa from "koa";
import { koaBody } from "koa-body";
import render from "koa-ejs";
import path from "path";
import { URL } from "url";
import { routes } from "./routes/routes.js";

const app = new Koa();
const __dirname = new URL(".", import.meta.url).pathname;

render(app, {
  root: path.join(__dirname, "view"),
  layout: "template",
  viewExt: "html",
  cache: false,
  debug: true,
});

app.use(async function (ctx) {
  await ctx.render("product", {});
});

app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());
const PORT = 5000;

app.listen(PORT);
console.log("app listening on port " + PORT);

app.on("error", (err, ctx) => {
  console.log("server error", err, ctx);
});
