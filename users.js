import express from "express";
import router from "./routers/users.js";
import { engine } from "express-handlebars";
import cors from "cors";
import "./mongo.js";
import "dotenv/config";

const app = express();
app.disable("x-powered-by");
//puedo pasarle cuales son las url permitidas
app.use(cors());

//middleware global
app.use(express.json());

//setting handlebars NO UTILIZADO HASTA EL MOMENTO
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use("/users", router);

//middleware en caso de error
app.use((req, res) => {
  res.status(404).send("<h1>401</h1>");
});

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`Servidor escuchando en http://localhost:${PORT}/users`)
);

app.on("error", (error) => {
  console.log(`${error}`);
  process.exit(1);
});
