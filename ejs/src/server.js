const express = require('express');
const path = require("path");
const app = express();
const routes = require('./routes/main.js')
const PORT = 8080;

const server = app.listen(PORT, () => {
console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
})
server.on("error", (error) => console.log(`Error en servidor ${error} `));

app.set('views', path.join(__dirname, './views'));
app.set('views engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use('/home', express.static(__dirname + '../../html/index.html'))

app.use((error,req, res) => {
    console.log(error.message);
    res.status(error.statusCode).send(error.message)
})