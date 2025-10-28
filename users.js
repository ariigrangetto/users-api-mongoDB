import express from "express";
import { createUserRouter } from "./routers/users.js";
// import { engine } from "express-handlebars";
import cors from "cors";
import "./mongo.js";
import "dotenv/config";

console.log("jola");

export const createApp = ({ userModel }) => {
  const app = express();
  app.disable("x-powered-by");
  //puedo pasarle cuales son las url permitidas
  app.use(cors());
  //middleware global
  app.use(express.json());
  app.use("/users", createUserRouter({ userModel }));

  //middleware en caso de error
  app.use((req, res) => {
    res.status(404).send("<h1>404 - not found</h1>");
  });

  const PORT = process.env.PORT;

  app.listen(PORT, () =>
    console.log(`Servidor escuchando en http://localhost:${PORT}/users`)
  );

  app.on("error", (error) => {
    console.log(`${error}`);
    process.exit(1);
  });
};

//setting handlebars NO UTILIZADO HASTA EL MOMENTO
// app.engine(".hbs", engine({ extname: ".hbs" }));
// app.set("view engine", ".hbs");
// app.set("views", "./views");
