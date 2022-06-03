const http = require('http');
const moment = require('moment');
const express = require('express');
const fs = require('fs');

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
        /* fs.promises.writeFile(`./${fileName}`, '') */
    }

    async save(objeto) {
        let datos = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
        if(!datos) {
            objeto.id = 1
            const arreglo = [objeto]
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(arreglo))
            return objeto.id
        } else {
            datos = JSON.parse(datos);
            objeto.id = datos.length + 1
            datos.push(objeto)
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(datos))
            return objeto.id
        }
    }

    async getById(id){
        let datos = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, 'utf-8'));
        const objeto = datos.find(pro => pro.id === id)   
        if(objeto){
            console.log(objeto);
            return objeto;
        }else{
            console.log(`El numero de id: ${id} no existe.`);
        }
    }

    async getAll(){
        let datos = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, 'utf-8'));
        const objetos = datos.map(obj => obj)
        console.log(objetos ? objetos : 'No hay productos');
        return objetos;
    }

    async deteleById(id){
        let datos = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, 'utf-8'));
        const arreglo = datos.filter(pro => pro.id !== id);
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(arreglo));
        console.log(`El Objeto con Id: ${id} fue eliminado`);
        console.log(JSON.parse(await fs.promises.readFile(`./${this.fileName}`, 'utf-8')));
    }

    async deleteAll(){        
        await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(''));
        console.log(`Se eliminaron todos los objetos.`);
    console.log(JSON.parse(await fs.promises.readFile(`./${this.fileName}`, 'utf-8')));
    }

}

const productos = new Contenedor('datos.txt')

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
app.set('view engine', 'pug');*/

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));
/*
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
    res.send(await productos.getAll());
});

app.get('/productoRandom', async (req, res) => {
    let arr = JSON.parse(await fs.promises.readFile('./datos.txt', 'utf8'));
    const azar = Math.floor(Math.random() * (arr.length - 0) + 1);
    res.send(await productos.getById(azar));
});