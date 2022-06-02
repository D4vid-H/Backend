const http = require('http');
const moment = require('moment');
const express = require('express');
const fs = require('fs');

/* const server = http.createServer((req, res) => {
    res.end('Hola mundo')
})

const connectedServer = server.listen(8080, () => {
   console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port}`)
}) */

// ---------------------------------------------------------------------------------------------

/* const server = http.createServer((req, res) => {
    let now = parseInt(moment().hour());
    console.log(now);
    if((now >= 06) && (now <= 12)){ 
        res.end('Buenos dias!');
    }else if((now > 12) && (now <= 20)){
        res.end('Buenas tardes!');
    }else { 
        res.end('Buenas noches!');
    }
})

const connectedServer = server.listen(8080, () => {
   console.log(`Servidor Http escuchando en el puerto ${connectedServer.address().port}`)
}) */

//--------------------------------------------------------------------------------

const app = express();
const PORT = 8080;
let count = 0;

/* app.set('views', './views');
app.set('view engine', 'pug');

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));

app.get('/', (req, res) => {
    res.render('index.pug', { title: 'Hey', message: 'Bienvenidos al servidor express!'});
});
app.get('/visitas', (req, res) => {
    count++;
    res.send({mensaje: `La cantidad de visitas es: ${count}`})
});
app.get('/fyh', (req, res) => {
    res.send({fyh: moment().format('DD/MM/YYYY h:m:s')})
}); */

//-----------------------------------------------------------------------------------

app.get('/productos', async (req, res) => {
    let arr = JSON.parse(await fs.promises.readFile('./datos.txt', 'utf8'));
    res.send(arr);
});

app.get('/productoRandom', async (req, res) => {
    let arr = JSON.parse(await fs.promises.readFile('./datos.txt', 'utf8'));
    const azar = Math.floor(Math.random() * (arr.length - 0));
    res.send(arr[azar]);
});