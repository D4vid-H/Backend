const express = require('express');
const { Router } = express;
const routes = require('/routes/main.js')
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
})
server.on(error, (error) => console.log(`Error en servidor ${error} `));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

app.get('/', (req, res)=> {
    console.log('Directorio Raiz');
    res.sendFile(__dirname + '/html/index.html')
})



app.use(error, (req, res) => {
    console.log(error.message);
    res.status(error.statusCode).send(error.message)
})