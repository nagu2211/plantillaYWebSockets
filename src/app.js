import express from "express";
import handlebars from "express-handlebars";
import path from "path";
import { Server } from "socket.io";
import { cartsRouter } from "./routes/carts.router.js";
import { productsRouter } from "./routes/products.router.js";
import { viewsRouter } from "./routes/views.router.js";
import { __dirname } from "./utils.js";
import productManager from './components/ProductManager.js'

const productM = new productManager();
const allProducts = productM.readProducts();

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Config del motor de plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static("public"));

const httpServer = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("cliente conectado");

  socket.on("new-product", async (newProd)=>{
    await productM.addProduct(newProd);
    const promiseProducts = await allProducts
    console.log(promiseProducts)
    socketServer.emit("products", (promiseProducts) )
  })
  // back envia msg al front
  // setInterval(() => {
  //   socket.emit("msg_back_front", {
  //     msg: "hola mundo desde back",
  //     from: "server",
  //   });
  // }, 1000);
  // back ataja msg del front
  socket.on("msg_front_back", (msg) => {
    console.log(msg);
  });
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
