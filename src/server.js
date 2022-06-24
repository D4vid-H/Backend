const express = require('express');
const {Server: IOServer} = require('socket.io')
const app = express();
const path = require('path')
const port = 8080;
const expressServer = app.listen(port, ()=> console.log(`Servidor escuchando en el puerto:${port}`));
const io = new IOServer(expressServer);

const messageArray = []

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', socket => {
    console.log(`Se conecto un usuario: ${socket.id}`);
    socket.emit('server: mensajes', messageArray)

    socket.on('client:message', messageInfo => {
        console.log(messageInfo);
        messageArray.push(messageInfo)

        io.emit('server: mensajes', messageArray)
    })
})