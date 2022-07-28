const app = document.querySelector('#app');
const boton = document.querySelector('#update');
//const setId = document.querySelector('#setId');
const formUpdate = document.querySelector('#formUpdate');
const changeProd = document.querySelector('#changeProd');
const formSet = document.querySelector('#formSet');
const chargeProd = document.querySelector('#chargeProd');

async function arrayProd(){
    const data = await fetch('/api/productos/0');
    const array = await data.json();
    return array;
}

const showProducts = async() =>{
    const prodArray = await arrayProd();
    prodArray.map(prod => {
        app.innerHTML += `<div class="prodCard">
        <div class="prodImgCont">
            <img class="prodImg" src="${prod.picturUrl}" alt="">
        </div>
          <div class="prodInfoCont">
              <h1 class="prodName">${prod.name}</h1>
              <p class="prodCode">codigo: ${prod.code}</p>
              <p class="prodDescription">Descripcion: ${prod.description}</p>
              <span class="prodPrice">Precio: ${prod.price}</span><span class="prodStock">Stock: ${prod.stock}</span>
              <button class="prodButton">ver</button>
          </div>  
    </div>  `    
    });
}

 const showProdUpdate = (prod) => {
    formUpdate.innerHTML = 
    `<form id="formSet">
        <fieldset class="formulario">
            <label for="name">Nombre del producto:</label>
            <input type="text" name="name" value="${prod.name}">
            <label for="description">Descripcion del producto:</label>
            <textarea name="description" rows="auto" cols="auto" placeholder="Descripcion del producto"></textarea>
            <label for="code">Codigo:</label>
            <input type="text" name="code" value="${prod.code}">
            <label for="image">Imagen:</label>
            <input type="text" name="image" value="${prod.picturUrl}">
            <label for="price">Precio:</label>
            <input type="number" name="price" value="${prod.price}">
            <label for="stock">Stock:</label>
            <input type="number" name="stock" value="${prod.stock}">
            <label for="admin"><input type="checkbox" name="admin" id="admin" value="true" class="checkbox">Administrador</label>
            <button id="actualizarProd">Actulizar</button>
            <button id="borrarProd">Borrar</button>
        </fieldset>
    </form>`
}

boton.addEventListener('click', (evt) => {
    evt.preventDefault();
    showProducts();
})


/* setId.addEventListener('input', (evt) => {
    evt.preventDefault;
    const idProd = evt.target.value;
    chargeProd.addEventListener('click', e =>{
        e.preventDefault;
        actualizarProd(idProd);
    });
}, true)


async function actualizarProd(idProd){
    const prodArray = await arrayProd();
    const product = prodArray.find(prod => prod.id === idProd)
    showProdUpdate(product); 
} */

