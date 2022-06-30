require('dotenv').config();
const express = require('express');
const path = require('path');
const port = process.env.PORT;
const fs = require('fs');
const {Server: IOServer} = require('socket.io');
const app = express();
const serverExpress = app.listen(port, error => {
    if(error){
        console.log(`Servidor caido, con error: ${error}`);
    }else{
        console.log(`Servidor On-LINE escuchando en puerto: ${port}`);
    }
});
const io = new IOServer(serverExpress);

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
        /* fs.promises.writeFile(`./${fileName}`, '') */
    }

    async add(objeto) {
        try{
            let datos = await fs.promises.readFile(path.join(__dirname, `./${this.fileName}`), 'utf-8')
            if(!datos) {
                objeto.id = 1
                const arreglo = [objeto]
                await fs.promises.writeFile(path.join(__dirname, `./${this.fileName}`), JSON.stringify(arreglo))
                return objeto.id
            } else {
                datos = JSON.parse(datos);
                objeto.id = datos[datos.length - 1].id + 1
                datos.push(objeto)
                await fs.promises.writeFile(path.join(__dirname, `./${this.fileName}`), JSON.stringify(datos))
                return objeto.id
            }
        }catch(error){
            console.log(`Error: ${error}`);
        }
    }
    
    async getAll(){
        try{
            let datos = await fs.promises.readFile(path.join(__dirname, `./${this.fileName}`), 'utf-8');
            if(datos){
                let datos = JSON.parse(await fs.promises.readFile(path.join(__dirname, `./${this.fileName}`), 'utf-8'));
                const objetos = datos.map(obj => {
                        obj.hasAny = true;
                        return obj;
                    });
                return objetos;
            }else{
                return [{message: 'No hay productos', hasAny: false}];
            }
        }catch(error){
            console.log(`Error: ${error}`);
        }
    }

    async getById(id){
        try{
            let datos = JSON.parse(await fs.promises.readFile(path.join(__dirname, `./${this.fileName}`), 'utf-8'));
            const objeto = datos.find(pro => pro.id === id)   
            if(objeto){
                console.log(objeto);
                return objeto;
            }else{
                console.log(`El numero de id: ${id} no existe.`);
            }
        }catch(error){
            console.log(`Error: ${error}`);
        }
    }


    async deteleById(id){
        try{
            let datos = JSON.parse(await fs.promises.readFile(path.join(__dirname, `./${this.fileName}`), 'utf-8'));
            const arreglo = datos.filter(pro => pro.id !== id);
                await fs.promises.writeFile(path.join(__dirname, `./${this.fileName}`), JSON.stringify(arreglo));
            console.log(`El Objeto con Id: ${id} fue eliminado`);
            console.log(JSON.parse(await fs.promises.readFile(path.join(__dirname, `./${this.fileName}`), 'utf-8')));
        }catch(error){
            console.log(`Error: ${error}`);
        }
    }

    async deleteAll(){  
        try{
            await fs.promises.writeFile(path.join(__dirname, `./${this.fileName}`), JSON.stringify(''));
            console.log(`Se eliminaron todos los objetos.`);
            console.log(JSON.parse(await fs.promises.readFile(path.join(__dirname, `./${this.fileName}`), 'utf-8')));
        }catch(error){
            console.log(`Error: ${error}`);
        }
    }

}

const productosContenedor = new Contenedor('productos.txt')
const messageContenedor = new Contenedor('post.txt')

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', async socket => {
    console.log(`Se conecto un nuevo Cliente con ID: ${socket.id}`);

        socket.emit('server:data', await productosContenedor.getAll());
        socket.emit('server:message', await messageContenedor.getAll()); 

    socket.on('client:product', async product =>{
        await productosContenedor.add(product);
        io.emit('server:data', await productosContenedor.getAll());
    })
    socket.on('client:message', async message => {
        await messageContenedor.add(message);
        io.emit('server:message', await messageContenedor.getAll())
    })
})



