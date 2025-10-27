import mongoose from "mongoose";
import "dotenv/config";

const connectionString = process.env.MONGO_DB_URI;

if (!connectionString) {
  console.error("No se encuentra conexión");
  process.exit(1);
}

//si utilizo una sola base de datos es connect, en caso contrario es .creatConnection
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1); //forzado de terminacion inmediata, ignorando tareas asincronas
    //0 indica significa exito
    //cualquier otro numero significa falla
  });

//Cerrar la conexion cuando la app se cierre
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Conexión a MongoDB cerrada");
  process.exit(0);
});

//por default: en caso de que falle algo, debo de desconectar mi base de datos
process.on("uncaughtException", (error) => {
  console.log(error);
  mongoose.disconnect();
});
