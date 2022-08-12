import { renderTemplateProducts, renderTemplateMessages } from './renders.js'
const socket = io();

const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });
const messageSchema = new normalizr.schema.Entity('text', {authorSchema}, { idAttribute: 'id' } );

const postSchema = new normalizr.schema.Entity(
    'posts', 
    { 
    mensajes: [messageSchema]
    },
    { idAttribute: 'id' }
);


/* const formProduct = document.querySelector('#formProduct')
const infoTitle = document.querySelector('#infoTitle');
const infoImg = document.querySelector('#infoImg');
const infoPrice = document.querySelector('#infoPrice'); */

const saludo = document.querySelector('#saludo');

const formMessage = document.querySelector('#formMessage');
const infoEmail = document.querySelector('#infoEmail');
const infoMessage = document.querySelector('#infoMessage');
const infoName = document.querySelector('#infoName');
const infoSurName = document.querySelector('#infoSurName');
const infoAlias = document.querySelector('#infoAlias');
const infoEdad = document.querySelector('#infoEdad');
const infoAvatar = document.querySelector('#infoAvatar');
/* const infoLogin = document.querySelector('#login__input'); */


const btnBorrarProd = document.querySelector('#btnBorrarProd');
/* const btnLogin = document.querySelector('#btn__login'); */
//const btnBorrarMsg = document.querySelector('#btnBorrarMsg');

/* btnLogin.addEventListener('submit', evt => {
    evt.preventDefault();
    const name = infoLogin.value;
        socket.emit('client:product', {title, thumbnail, price})
}) */

formMessage.addEventListener('submit', evt => {
    evt.preventDefault();
 /*    const id = infoEmail.value;
    const message = infoMessage.value;
    const name = infoName.value;
    const surname = infoSurName.value;
    const alias = infoAlias.value;
    const edad = infoEdad.value;
    const avatar = infoAvatar.value; */
    //const btnBorrarProd = document.querySelector('#btnBorrarProd');
    const mensaje =
    {
        author: {
            email: infoEmail.value, 
            nombre: infoName.value, 
            apellido: infoSurName.value, 
            edad: infoEdad.value, 
            alias: infoAlias.value,
            avatar: infoAvatar.value
        },
        text: infoMessage.value        
    }
    socket.emit('client:msgNormalizr', mensaje)
})

btnBorrarProd.addEventListener('click', evt =>{
    evt.preventDefault();
    socket.emit('client: actualizarTabla', {hasAny:true});
})

/* btnBorrarMsg.addEventListener('click', evt =>{
    evt.preventDefault();
    socket.emit('client:borrarMessages', {hasAny:true});
}) */

socket.on('server:cookiID', name => {
    saludo.innerHTML = `Bienvenido ${name}`
})


socket.on('server:data', productArray => {
    if(productArray.length !== 0){
        productArray.forEach(prod => {
        document.querySelector('#prodContainer').innerHTML = '';
        if(!prod.hasAny){
            return renderTemplateProducts(prod);
        }
        renderTemplateProducts(prod);      
        })
    }else{
        document.querySelector('#prodContainer').innerHTML = '';
    }
})

socket.on('server:normalizedMsg', (messageArray) => {    
    if(messageArray.length !== 0){
        const newMessages = normalizr.denormalize(
                messageArray.result, 
                [postSchema], 
                messageArray.entities
                ); 
        const Compresion = Math.floor(-(JSON.stringify(newMessages).length * 100 / JSON.stringify(messageArray).length) + 100);
        document.querySelector('#MsgPorciento').innerHTML = `La compresion por Normalizar es: ${Compresion}%`;
        newMessages.forEach(message =>{
            document.querySelector('#messageContainer').innerHTML = '';
            renderTemplateMessages(message);
        })
    }else {
        document.querySelector('#messageContainer').innerHTML = 'No hay mensajes';
    }
})
 