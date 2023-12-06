import Router from "koa-router";
import todoHandler from "../handlers/todoes/todoHandlers.js";
import { todoUpdateValidMiddleware } from "../middlewares/todoUpdateValidMiddleware.js";
import { todoValidMiddleware } from "../middlewares/todoValidMiddleware.js";

const router = new Router({ prefix: "/api" });

router.get("/todo", todoHandler.getAllTodo);

router.post("/todo", todoValidMiddleware, todoHandler.addNewTodo);

router.get("/todo/:id", todoHandler.getById);

router.put("/todo/:id", todoUpdateValidMiddleware, todoHandler.updateTodo);

router.delete("/todo/:id", todoHandler.deleteTodo);

export const routes = router;
