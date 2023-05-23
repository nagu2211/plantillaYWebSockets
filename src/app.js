import express from "express";
import handlebars from "express-handlebars";
import { cartsRouter } from "./routes/carts.router.js";
import { productsRouter } from "./routes/products.router.js";
import { viewsRouter } from "./routes/views.router.js";
import { __dirname } from "./utils.js";
import path from "path";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Config del motor de plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

//Router
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);
app.use("/products", viewsRouter);

app.get("*", (req, res) => {
  return res
    .status(404)
    .json({ status: "error", msg: "no se encuentra esa ruta", data: {} });
});
