import knex from 'knex';
import config from "../config.js";

const mySQL = knex(config.sql);

export default class ContenedorSQL {
    constructor(table) {
      this.coleccion = mySQL(table);
      this.select = mySQL.from(table);
    }

    async add(product) {
      try {
        const datos = await this.select.select('*');
        if (datos.length === 0) {
          product.id = 1;
          product.timestamp = Date.now();
          await this.coleccion.insert(product);
          //await mySQL.destroy();
          return product.id;
        } else {
          product.id = datos[datos.length - 1].id + 1;
          product.timestamp = Date.now();
          await this.coleccion.insert(product);
          //await mySQL.destroy();
          return product.id;
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
  
    async getAll() {
      try {
        const datos = await this.select.select('*');
        console.log(datos);
        if (datos.length !== 0) {
          //await mySQL.destroy();
          return datos;
        } else {
          //await mySQL.destroy();
          return (`No hay productos.`);
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
  
    async getById(id) {
      try {
        const dato = await this.select.select('*').where({id: id});
        console.log(dato);
        if (dato) {
          //await mySQL.destroy();
          return dato;
        } else {
          //await mySQL.destroy();
          return `No existe producto con Id: ${id}`;
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
  
    async set(id, product) {
      try {
        const dato = await this.coleccion.where({ id: id });
        if (dato) {
          product.timestamp = Date.now();
          product.id = dato.id;
          return await this.coleccion.where({ id: id }).update(product);
        } else {
          return (`El producto con id: ${id} no existe.`);
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
  
    async deleteById(id) {
      try {
        const dato = await this.coleccion.where({ id: id });
        console.log(dato);
        if (dato) {
          await this.coleccion.where({ id: id }).del();
          return { borrarID: dato.id };
        } else {
          return s(`El producto con id: ${id} no existe.`);
        }
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }


    

}