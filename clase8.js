const express = require("express");
const { Router } = express
const app = express();
/* const router = Router() */
const routes = require('./routes/main.js')
const PORT = 8080;

const multer = require('multer');

/* const personas = [];
const mascotas = []; */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.use('/api', routes)

/* app.use('/home', express.static(__dirname + '/html')) */
app.use('/upload', express.static(__dirname + '/files'))

app.get('/upload', (req, res) => {
  res.sendFile(__dirname + '/html/index.html')
})

app.use((error, req, res) => {
  console.log(error.message);
  res.status(error.statusCode).send(error.message)
})

