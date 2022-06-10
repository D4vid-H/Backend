const express = require("express");
const app = express();
const PORT = 8080;

const persona = [];
const mascota = [];

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

