import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import router from './routers/index.js';
import fetch from "node-fetch";
import mongoose from 'mongoose';
import Message from './mongoDB/mongoConnect.js';
import { normalize } from 'normalizr';
import postSchema from './normalized/normalizr.js'


console.log(process.env.MONGOOSE_ENV);

await mongoose.connect(process.env.MONGOOSE_ENV)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 8080;
const app = express();
const serverExpress = app.listen(port, error => {
    if(error){
        console.log(`Servidor caido, con error: ${error}`);
    }else{
        console.log(`Servidor On-LINE escuchando en puerto: ${port}`);
    }
});
const io = new Server(serverExpress);

const mensajes = async () => {
    const arraymessages = await Message.find();
        if(arraymessages.length !== 0){
            let i = 0;
            const nuevoArray = arraymessages.map( doc => {
                i++
                const obj = { id: i, author: doc?.author, text: doc?.text }
                return obj;
            });
            const normalizedPost = normalize( nuevoArray , [postSchema]);
        return normalizedPost;
        }
}


app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', router);

io.on('connection', async socket => {
    console.log(`Se conecto un nuevo Cliente con ID: ${socket.id}`);

        const Producto = await fetch("http://localhost:8080/api/productos-test");
        const ProductoJSON = await Producto.json();
        socket.emit('server:data', ProductoJSON);

        const messages = await mensajes();
        socket.emit('server:normalizedMsg', messages);
        

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

    socket.on('client:msgNormalizr', async message => {
            const mensaje = new Message(message)
        await mensaje.save();
            const messages = await mensajes();
        io.emit('server:normalizedMsg', messages);
    })
});



