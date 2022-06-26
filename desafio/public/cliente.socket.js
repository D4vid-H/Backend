const socket = io();

const messageForm = document.querySelector('#messageForm')
const messageInput = document.querySelector('#messageInput')
const pizarra = document.querySelector('#pizarra')

messageForm.addEventListener('submit', evt =>{
    evt.preventDefault()
    const message = messageInput.value;   
    socket.emit('client:message', {message}) // revisar esto si no funca
})

socket.on('server:message', messageArray =>{
    pizarra.innerHTML = ''
    messageArray.forEach(messageInfo => {

        pizarra.innerHTML += `<p> SocketID: ${messageInfo.socketId}, Message: ${messageInfo.message}</p>`
    });
})