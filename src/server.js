import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import router from './routers/index.js';
import fetch from "node-fetch";
import mongoose from 'mongoose';
import config from './config.js';
import Message from './mongoDB/mongoConnect.js'
await mongoose.connect(config.mongoose)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT;
const app = express();
const serverExpress = app.listen(port, error => {
    if(error){
        console.log(`Servidor caido, con error: ${error}`);
    }else{
        console.log(`Servidor On-LINE escuchando en puerto: ${port}`);
    }
});
const io = new Server(serverExpress);



app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', router);

io.on('connection', async socket => {
    console.log(`Se conecto un nuevo Cliente con ID: ${socket.id}`);

        const Producto = await fetch("http://localhost:8080/api/productos-test");
        const ProductoJSON = await Producto.json();
        socket.emit('server:data', ProductoJSON);

        /* const messages = await message.getAll();
        socket.emit('server:message', messages); */

     /* socket.on('client:product', async product =>{
        const Producto = await fetch("http://localhost:8080/api/productos-test");
        const ProductoJSON = await Producto.json();
        io.emit('server:data', ProductoJSON);
    }) */

    socket.on('client: actualizarTabla', async () => {
        const Producto = await fetch("http://localhost:8080/api/productos-test");
        const ProductoJSON = await Producto.json();
        io.emit('server:data', ProductoJSON);
    })

    socket.on('client:borrarMessages', async obj => {
        await messageContenedor.deleteAll(obj);
        const newMessage = await messageContenedor.getAll();
        io.emit('server:message', newMessage);
    }) 

    socket.on('client:message', async message => {
        await messageContenedor.add(message);
        const newMessage = await messageContenedor.getAll();
        io.emit('server:message', newMessage);
    })
});



