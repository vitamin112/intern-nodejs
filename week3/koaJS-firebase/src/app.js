import Koa from "koa";
import { koaBody } from "koa-body";
import { routes } from "./routes/routes.js";

const app = new Koa();
const PORT = 5000;

app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(PORT);
console.log("app listening on port " + PORT);

app.on("error", (err, ctx) => {
  console.log("server error", err, ctx);
});
