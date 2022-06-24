const socket = io();
const messageForm = document.querySelector('#messageForm');
const usernameInput = document.querySelector('#usernameInput');
const messageInput = document.querySelector('#messageInput');
const messagesPool = document.querySelector('#messagesPool');

function sendMessage(messageInfo){
    socket.emit('client:message', messageInfo);
}


function submitHandler (event) {
    event.preventDefault();    
    const messageInfo = { username: usernameInput.value, message: messageInput.value };
    sendMessage(messageInfo);
}

messageForm.addEventListener('submit', submitHandler)

function renderMessage(messagesInfo){
const html = messagesInfo.map(messageInfo => {
    return(`<div> 
            <stronge>${messageInfo.username}</stronge>:
            <em>${messageInfo.message}</em> </div>` )
}).join(" ");
    messagesPool.innerHTML = html;
}

socket.on('server: mensajes', renderMessage);