import { renderTemplateProducts, renderTemplateMessages } from './renders.js'
const socket = io();

const formProduct = document.querySelector('#formProduct')
const infoTitle = document.querySelector('#infoTitle');
const infoImg = document.querySelector('#infoImg');
const infoPrice = document.querySelector('#infoPrice');

const formMessage = document.querySelector('#formMessage');
const infoEmail = document.querySelector('#infoEmail');
const infoMessage = document.querySelector('#infoMessage');

formProduct.addEventListener('submit', evt => {
    evt.preventDefault();
    const title = infoTitle.value;
    const thumbnail = infoImg.value;
    const price = infoPrice.value;
        socket.emit('client:product', {title, thumbnail, price})
})

formMessage.addEventListener('submit', evt => {
    evt.preventDefault();
    const email = infoEmail.value;
    const message = infoMessage.value;
    const tempo= Date.now();
    const hoy = new Date(tempo);
    const date = hoy.toUTCString();
        socket.emit('client:message', {email, date, message})
})

socket.on('server:data', productArray => {
   productArray.forEach(prod => {
    document.querySelector('#prodContainer').innerHTML = '';
    if(!prod.hasAny){
        return renderTemplateProducts(prod);
    }
        renderTemplateProducts(prod);      
    })
})

socket.on('server:message', messageArray => {
    messageArray.forEach(message =>{
        document.querySelector('#messageContainer').innerHTML = '';
        if(!message.hasAny){
            renderTemplateMessages(message);
        }else{
            renderTemplateMessages(message);
        }
    })
})
 