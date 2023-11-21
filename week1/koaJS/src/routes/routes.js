import Router from "koa-router";
import productHandler from "../handlers/products/productHandlers.js";
import { productUpdateValidMiddleware } from "../middlewares/productUpdateValidMiddleware.js";
import { productValidMiddleware } from "../middlewares/productValidMidleware.js";

const router = new Router({ prefix: "/api" });

router.get("/products", productHandler.getAllProduct);

router.post("/products", productValidMiddleware, productHandler.addNewProduct);

router.get("/products/:id", productHandler.getById);

router.put(
  "/products/:id",
  productUpdateValidMiddleware,
  productHandler.updateProduct
);

router.delete("/products/:id", productHandler.deleteProduct);

export const routes = router;
