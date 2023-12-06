const Koa = require('koa');
const routes = require('./routes/routes');
const cors = require('@koa/cors');
const hybridBodyParser = require('./middlewares/bodyParseMiddleware');

const app = new Koa();

app.use(hybridBodyParser());
app.use(cors());
app.use(routes.routes());
app.use(routes.allowedMethods());

module.exports = app;
