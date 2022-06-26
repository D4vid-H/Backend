const express = require('express')
const {Server: IOServer} = require('socket.io')
const path = require('path')
const app = express();
const port = 8080/* process.env.PORT */
const messageArray = []
const serverExpress = app.listen(port, (error)=>{
    if(error){
        console.log(`El servidor tiene un error: ${error}`);
    }else{
        console.log(`Servidor OnLine escuchando en puerto: ${port}`);
    }
})
app.use(express.static(path.join(__dirname, '../public')))

const io = new IOServer(serverExpress);

io.on('connection', socket => {
    console.log(`Se conecto un nuevo cliente con Id: ${socket.id}`);

    io.emit('server:message', messageArray)

    socket.on('client:message', messageInfo => {
        const messageFull = {message: messageInfo.message, socketId: socket.id}
        messageArray.push(messageFull)
        io.emit('server:message', messageArray)
    })
})
