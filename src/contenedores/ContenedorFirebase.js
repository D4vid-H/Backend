
import admin from 'firebase-admin';
import config from '../config.js';

admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
});

const firestoredb = admin.firestore();

export default class ContenedorFirebase {
    constructor(collectionName){
        this.coleccion = firestoredb.collection(collectionName);
    }

  async add(product){
    try {
      const datos = await this.coleccion.orderBy('id').get();
      if (datos.empty) {
        product.id = 1;
        product.timestamp = Date.now();
        await this.coleccion.add(product);
        return product.id;
      } else {
        const products = datos.docs.map(doc =>  doc.data());
        product.id = products[products.length - 1].id + 1;
        product.timestamp = Date.now();
        await this.coleccion.add(product);
        return product.id;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async addCart(){
    try {
      const datos = await this.coleccion.orderBy('id').get();
      if (datos.empty) {
        const carrito = {id: 1, timestamp: Date.now() , products: [] };
        await this.coleccion.add(carrito);
        return carrito.id;
      } else {
        const carritos = datos.docs.map(doc =>  doc.data());
        const carrito = {id: 1, timestamp: Date.now(), products: []};
        carrito.id = carritos[carritos.length - 1].id + 1;
        await this.coleccion.add(carrito);
        return carrito.id;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async getAll() {
    try {
      const datos = await this.coleccion.orderBy('id').get();
      if (!datos.empty) {
        const products = datos.docs.map(doc =>  doc.data());
          return products;
      } else {
        console.log(`No hay productos.`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
  
  async getAllCart(id) {
    try {
      const datos = await this.coleccion.orderBy('id').get();
      if (!datos.empty) {
        const carritos = datos.docs.map(doc =>  doc.data());
        if (carritos.find((cart) => cart.id === id)) {
          const carrito = carritos.find((cart) => cart.id === id);
          if (carrito.products.length === 0) {
            return { Products: "vacio" };
          } else {
            return carrito.products;
          }
        } else {
            return `El Carrito con id: ${id} no existe`;
          }
      } else {
        console.log(`No hay datos.`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async getById(id) {
    try {
      const datos = await this.coleccion.where('id', '==', id).get();
      if (!datos.empty) {
        const products = [];      
          datos.forEach(doc => {
            products.push(doc.data());
          });
          return products.find(prod => prod.id == id);
      } else {
        return `No existe producto con Id: ${id}`;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async set(id, product) {
    try {
      const datos = await this.coleccion.where('id', '=', id).get();
      if (!datos.empty) {
        const docID = datos.docs.map(doc => doc.id);
        const res = await this.coleccion.doc(docID[0]).update(product);        
        return res;
      } else {
        console.log(`El producto con id: ${id} no existe.`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async setCart(id, product) {
    try {
      const datos = await this.coleccion.where('id', '=', id).get();
      if (!datos.empty) {
        const docID = datos.docs.map(doc => doc.id);
        const carritos = datos.docs.map(doc => doc.data());
        const carrito = carritos.find(cart => cart.id === id)
        carrito.products.push(product);
        const res = await this.coleccion.doc(docID[0]).update(carrito);        
        return res;
      } else {
        console.log(`El producto con id: ${id} no existe.`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const datos = await this.coleccion.where('id', '=', id).get();
      if (!datos.empty) {
        const docID = datos.docs.map(doc => doc.id);
        const res = await this.coleccion.doc(docID[0]).delete();        
        console.log(res);
        return res;
        
      } else {
        console.log(`El producto con id: ${id} no existe.`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async deleteCart(id) {
    try {
      const datos = await this.coleccion.where('id', '=', id).get();
      if (!datos.empty) {
        const docID = datos.docs.map(doc => doc.id);
        const res = await this.coleccion.doc(docID[0]).delete();        
        console.log(res);
        return res;
        
      } else {
        console.log(`El carrito con id: ${id} no existe.`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async deteleProdByCartId(id, id_prod){
    try {
      const datos = await this.coleccion.where('id', '=', id).get();
      if (!datos.empty) {
        const docID = datos.docs.map(doc => doc.id);
        const carritos = datos.docs.map(doc => doc.data());
        const carrito = carritos.find(cart => cart.id === id)
        carrito.products = carrito.products.filter(prod => prod.id !== id_prod)
        const res = await this.coleccion.doc(docID[0]).update(carrito);         
        return res;
        
      } else {
        console.log(`El carrito con id: ${id} no existe.`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

}