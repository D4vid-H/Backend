import mongoose from "mongoose";
import config from "../config.js";

await mongoose.connect(config.mongo.connectDB);

export default class ContenedorMongoDB {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  async add(product) {
    try {
      const datos = await this.coleccion.find();
      if (datos.length === 0) {
        product.id = 1;
        product.timestamp = Date.now();
        await this.coleccion.create(product);
        return product.id;
      } else {
        product.id = datos[datos.length - 1].id + 1;
        product.timestamp = Date.now();
        await this.coleccion.create(product);
        return product.id;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async getAll() {
    try {
      const datos = await this.coleccion.find();
      if (datos.length !== 0) {
        return datos;
      } else {
        return `No hay productos.`;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async getById(id) {
    try {
      const datos = await this.coleccion.find({ id: id });
      if (datos) {
        const dato = datos.find((prod) => prod.id === id);
        return dato;
      } else {
        return `No existe producto con Id: ${id}`;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async set(id, product) {
    try {
      const datos = await this.coleccion.find({ id: id });
      if (datos) {
        const dato = datos.find((prod) => prod.id === id);
        product.timestamp = Date.now();
        return await this.coleccion.updateOne({ id: dato.id }, product);
      } else {
        return `El producto con id: ${id} no existe.`;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const datos = await this.coleccion.find({ id: id });
      if (datos) {
        const dato = datos.find((prod) => prod.id === id);
        await this.coleccion.deleteOne({ id: dato.id });
        return { borrarID: dato.id };
      } else {
        return s(`El producto con id: ${id} no existe.`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async addCart(user) {
    try {
      console.log(user);
      console.log("problema aca");
      const datos = await this.coleccion.find({ username: user });
      console.log(datos);
      if (datos.length === 0) {
        const carrito = { id: 1, user, timestamp: Date.now(), products: [] };
        await this.coleccion.create(carrito);
        return carrito.id;
      } else {
        /* const carrito = { id: 1, user, timestamp: Date.now(), products: [] };
        carrito.id = datos[datos.length - 1].id + 1;
        await this.coleccion.create(carrito); */
        return datos[0].id;
      }
    } catch (error) {
      console.log(`Error addCart: ${error}`);
    }
  }

  async getAllCart(id) {
    try {
      const datos = await this.coleccion.find({ id: id });
      if (datos.length !== 0) {
        const carrito = datos.find((cart) => cart.id === id);
        if (carrito.products.length === 0) {
          return { Products: "vacio" };
        } else {
          return carrito.products;
        }
      } else {
        return `El carrito con id:${id} no existe.`;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async setCart(id, product) {
    try {
      const datos = await this.coleccion.find({ id: id });
      if (!datos.empty) {
        const carrito = datos.find((cart) => cart.id === id);
        carrito.products.push(product);
        const res = await this.coleccion.updateOne({ id: carrito.id }, carrito);
        return res;
      } else {
        return `El producto con id: ${id} no existe.`;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async deleteCart(id) {
    try {
      const datos = await this.coleccion.find({ id: id });
      if (datos.length !== 0) {
        const res = await this.coleccion.deleteOne({ id: id });
        return res;
      } else {
        return `El carrito con id:${id} no existe.`;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async deteleProdByCartId(id, id_prod) {
    try {
      const datos = await this.coleccion.find({ id: id });
      if (datos.length !== 0) {
        const carrito = datos.find((cart) => cart.id === id);
        carrito.products = carrito.products.filter(
          (prod) => prod.id !== id_prod
        );
        const res = await this.coleccion.updateOne({ id: carrito.id }, carrito);
        return res;
      } else {
        return `El carrito con id: ${id} no existe.`;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async getByUser(user) {
    try {
      const datos = await this.coleccion.find({ username: user });
      if (datos) {
        const dato = datos.find((usuario) => usuario.username === user);
        return dato;
      } else {
        return `No existe producto con Id: ${id}`;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async addUser(user) {
    const newUser = await this.coleccion.create(user);
    return newUser;
  }
}
