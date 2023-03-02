const Koa = require("koa");
const cors = require("@koa/cors");
const Router = require("koa-router");
const BodyParser = require("koa-bodyparser");

const app = new Koa();
const bodyparser = new BodyParser();

// add middleware
app.use(bodyparser);

// add all router
const router = new Router();
require("./openai")(app, router);

app.use(cors());
app.use(router.routes());

console.log("listen on port:3000");
app.listen(3000);
