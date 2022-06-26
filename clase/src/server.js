require('dotenv').config();
const express = require('express')
const { Server: IOServer } = require('socket.io');
const path = require('path')
const app = express();
const port = process.env.PORT;
const messageArray = []
const expressServer = app.listen(port, (error) => {
    if(error){
        console.log(`Servidor con error: ${error}`);
    }else{
        console.log(`Servidor en linea escuchando puerto: ${port}`);
    }
})

app.use(express.static(path.join(__dirname, '../public')))

const io = new IOServer(expressServer);

io.on('connection', socket => {
    console.log(`Se conecto un cliente con Id: ${socket.id}`);

    io.emit('server:mensaje', messageArray)

    socket.on('cliente:mensaje', messageInfo =>{
        messageArray.push(messageInfo)
        io.emit('server:mensaje', messageArray)
    } )
})