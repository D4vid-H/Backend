const socket = io();

const formMessage = document.querySelector('#formMessage')
const userInput = document.querySelector('#userInput')
const messageInput = document.querySelector('#messageInput')
const messagePool = document.querySelector('#messagePool')

formMessage.addEventListener('submit', evt =>{
    evt.preventDefault();

    const username = userInput.value
    const message = messageInput.value

    socket.emit('cliente:mensaje', {username, message})
})

socket.on('server:mensaje', messageArray => {
    messagePool.innerHTML = ''
    
    messageArray.forEach(messageInfo => {
        messagePool.innerHTML += `<li>${messageInfo.username} ${messageInfo.message} </li>`
    });
})