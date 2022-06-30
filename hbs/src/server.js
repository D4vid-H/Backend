const express = require('express');
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const routes = require('./routes/main.js')
const PORT = 8080;

const server = app.listen(PORT, () => {
console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
})
server.on("error", (error) => console.log(`Error en servidor ${error} `));

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './views/layout/main.hbs'),
    layoutsDir: path.join(__dirname, './views/layout'),
    partialsDir: path.join(__dirname, './views/partials')
}));
  

app.set('views', path.join(__dirname, './views'));
app.set('views engine', 'hbs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.use('/home', express.static(__dirname + '../../html/index.html'))
