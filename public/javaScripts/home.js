addEventListener("load", async (evt) => {
  const app = document.querySelector("#app");
  const home = document.querySelector("#home");

  const array = await fetch("/api/productos/all");
  const prodArray = await array.json();
  prodArray.map((prod) => {
    app.innerHTML += ` <div class="prodCard" >
            <div class="prodImgCont" >
                <img class="prodImg" src="${prod.picturUrl.slice(1)}" alt="">
            </div>
            <div class="prodInfoCont" >
                <h1 class="prodName">${prod.name}</h1>
                <p class="prodCode">codigo: ${prod.code}</p>
                <p class="prodDescription">Descripcion: ${prod.description}</p>
                <span class="prodPrice">Precio: ${
                  prod.price
                }</span><span class="prodStock">Stock: ${prod.stock}</span>

                <form action="/api/carrito/producto" method="post">
                  <input type="hidden" value="${prod.id}" name="prod_id">
                  <input class="prodButton" type="submit" value="comprar">
                </form> 
            </div>  
            </div> `;
  });
});
