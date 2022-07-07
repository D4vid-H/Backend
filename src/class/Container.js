import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class prodContenedor {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async add(product) {
    try {
      let datos = await fs.promises.readFile(path.join(__dirname, `./class/${this.fileName}`), "utf-8");

      if (!datos) {        
        product.id = 1;
        product.timestamp = Date.now();
        const products = [product];
        await fs.promises.writeFile(
          path.join(__dirname, `./class/${this.fileName}`),
          JSON.stringify(products)
        );
        return product.id;
      } else {
        const products = JSON.parse(datos);
        product.id = products[products.length - 1].id + 1;
        product.timestamp = Date.now();
        products.push(product);
        await fs.promises.writeFile(
          path.join(__dirname, `./class/${this.fileName}`),
          JSON.stringify(products)
        );
        return product.id;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async getAll() {
    try {
      let datos = await fs.promises.readFile(path.join(__dirname, `./class/${this.fileName}`), "utf-8");
      if(datos){
        const products = JSON.parse(datos);
        return products;
      } else {
        console.log(`No hay productos.`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async getById(id) {
    try {
      let datos = await fs.promises.readFile(path.join(__dirname, `./class/${this.fileName}`), "utf-8");

      if(datos){
        const products = JSON.parse(datos);
        if(products.find(prod => prod.id === id)){
          const product = products.find(prod => prod.id === id);
          return product;
        } else{
          return (`No existe producto con Id: ${id}`);
        }
      } else {        
        return (`No hay datos.`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async set(id, product) {
    try {
      let datos = await fs.promises.readFile(path.join(__dirname, `./class/${this.fileName}`), "utf-8");
      console.log(datos);      
      if(datos){
        const products = JSON.parse(datos);
        const pro = products.find(prod => prod.id === id);
        const updateProduct = products.map((prod) => {
          if(prod.id === id){
            prod = { ...prod,
              name: product.name,
              timestamp: Date.now(),
              description: product.description,
              code: product.code,
              url: product.url,
              price: product.price,
              stock: product.stock,
            };
            return prod;
          }else{
            return prod;
          }      
        });
        console.log(updateProduct);
        await fs.promises.writeFile(
          path.join(__dirname, `./class/${this.fileName}`),
          JSON.stringify(updateProduct)
        );
        return ([{changeObj: pro}, {newObj: updateProduct.find(prod => prod.id === id)}])
      }else{
        console.log(`El producto con id: ${id} no existe.`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async deteleById(id) {
    try {
      let datos = await fs.promises.readFile(path.join(__dirname, `./class/${this.fileName}`), "utf-8");
      
      if(datos){
        const products = JSON.parse(datos);
        const prodArray = products.filter((prod) => prod.id !== id);
        await fs.promises.writeFile(path.join(__dirname, `./class/${this.fileName}`), JSON.stringify(prodArray));
        return ([{borrarID: id}, {newArrayID: prodArray.map(prod => prod.id)}]);
      }else{
        console.log(`El producto con id: ${id} no existe.`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}

export class cartContenedor {
    constructor(fileName) {
      this.fileName = fileName;
    }
  
    async add() {
      try {
        let datos = await fs.promises.readFile(
          path.join(__dirname, `./class/${this.fileName}`),
          "utf-8"
        );
        if (!datos) {
          const carts = [{id: 1, timestamp: Date.now(), products: []}];
          await fs.promises.writeFile(
            path.join(__dirname, `./class/${this.fileName}`),
            JSON.stringify(carts)
          );
          return carts[0].id;
        } else {
          const cartArray = JSON.parse(datos);
          const cart = {id: 1, timestamp: Date.now(), products: []};
          cart.id = cartArray[cartArray.length - 1].id + 1;
          cartArray.push(cart);
          await fs.promises.writeFile(
            path.join(__dirname, `./class/${this.fileName}`),
            JSON.stringify(cartArray)
          );
          return cart.id;
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
  
    async getAll(id) {
      try {
        let datos = await fs.promises.readFile(
          path.join(__dirname, `./class/${this.fileName}`),
          "utf-8"
        );
        if(datos){
            const carts = JSON.parse(datos);
            if(carts.find((cart) => cart.id === id)){
              const cart = carts.find((cart) => cart.id === id);
              return cart.products; 
            }else {
              return (`El Carrito con id: ${id} no existe`);
            }
        } else {
          return (`No hay datos.`);
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
  
    async getById(id, id_prod) {
      try {
        let datos = await fs.promises.readFile(path.join(__dirname, `./class/${this.fileName}`), "utf-8");
        if(datos){
          const carts = JSON.parse(datos);
          const cart = carts.find((cart) => cart.id === id);
          return cart.products.find(prod => prod.id === id_prod); 
        }else {
          console.log(`El Carrito con id: ${id} no existe.`);
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
  
    async set(id, product) {
      try {
        let datos = await fs.promises.readFile(path.join(__dirname, `./class/${this.fileName}`), "utf-8");

        if(datos){
            const carts = JSON.parse(datos);
            if(carts.find(cart => cart.id === id)){
              const cartProduct = carts.map((cart) => {
              if(cart.id === id){
                cart.products.push(product);
                return cart;
              }else{
                return cart;
              }});
              await fs.promises.writeFile(path.join(__dirname, `./class/${this.fileName}`),JSON.stringify(cartProduct));
              return cartProduct.find(cart => cart.id === id);
            }else{
              console.log(`No existe carrito con Id: ${id}`);
              return (`No existe carrito con Id: ${id}`);
            }
        }else{
            return (`No hay datos.`);
          }
      }catch (error) {
        nsole.log(`Error: ${error}`);
      }
    }
  
    async deteleById(id, id_prod) {
      try {
        let datos = await fs.promises.readFile(path.join(__dirname, `./class/${this.fileName}`),"utf-8");

        if(datos){
            const carts = JSON.parse(datos);
            if(carts.find(cart => cart.id === id)){
              const deleteProdCart = carts.map(cart => {
                if(cart.id === id){
                  const prod = cart.products.filter(prod => prod.id !== id_prod)
                  cart.products = prod;
                  return cart;
                }else{
                  return cart;
                }});;
              await fs.promises.writeFile(path.join(__dirname, `./class/${this.fileName}`), JSON.stringify(deleteProdCart));
              return deleteProdCart.find(cart => cart.id === id);
            }else{
              return (`No existe carrito con Id: ${id}`);
            }
        }else{
          return ('No existen datos.')
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
  
    async deleteCart(id) {
      try {
        let datos = await fs.promises.readFile(
          path.join(__dirname, `./class/${this.fileName}`),
          "utf-8");
        if(datos){
          const carts = JSON.parse(datos);
          if(carts.find(cart => cart.id === id)){
            const deletecart = carts.find(cart => cart.id === id);
            const updateCart = carts.filter(cart => cart.id !== id);
            await fs.promises.writeFile(
              path.join(__dirname, `./class/${this.fileName}`),
              JSON.stringify(updateCart));
            return deletecart.id;  
          }else {
            return (`No existe carrito con Id: ${id}`);
          }
        }else{
          console.log(`El Carrito con id: ${id} no existe`);
        }        
      }catch (error) {
        console.log(`Error: ${error}`);
      }
    }
}

