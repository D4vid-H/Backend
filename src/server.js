require('dotenv').config();
const express = require('express');
const path = require('path');
const port = process.env.PORT;
const databaseProducts = require('./database/database.js');
const databaseMessages = require('../db/SQLite3.js')
//const fs = require('fs');
const {Server: IOServer} = require('socket.io');
const app = express();
const serverExpress = app.listen(port, error => {
    if(error){
        console.log(`Servidor caido, con error: ${error}`);
    }else{
        console.log(`Servidor On-LINE escuchando en puerto: ${port}`);
    }
});
const io = new IOServer(serverExpress);

const createTableProductos = async(tableName) => {
    try{
        await databaseProducts.schema.dropTableIfExists(tableName);
        await databaseProducts.schema.createTable(tableName, table_prod => {
            table_prod.increments('id').primary();
            table_prod.string('title', 50).notNullable();
            table_prod.string('thumbnail', 1000).notNullable();
            table_prod.integer('price').notNullable();
        });
        
        console.log('tablePrds created!');
    }catch(error){
        console.log(error);
        database.destroy();
    }

}

const createTableMensajes = async(tableName) => {
    try{
        await databaseMessages.schema.dropTableIfExists(tableName);
        await databaseMessages.schema.createTable(tableName, table_msg => {
            table_msg.increments('id').primary();
            table_msg.string('message', 100).notNullable();
            table_msg.string('email', 1000).notNullable();
            table_msg.string('date', 100).notNullable();
        });
        
        console.log('tableMsg created!');
    }catch(error){
        console.log(error);
        database.destroy();
    }

}

class Contenedor {
    constructor(database, tableName) {
        this.database = database;
        this.tableName = tableName;
    }

    async add(objeto) {
        try{
            await this.database(this.tableName).insert(objeto);            
        }catch(error){
            console.log(`Error: ${error}`);
            database.destroy();
        }
    }
    
    async getAll(){
        try{
            const arrayFromDatabase = await this.database.from(this.tableName).select('*');
            const array = await Promise.all(
                arrayFromDatabase.map( obj =>{
                    obj.hasAny = true;
                    return obj;
                })          
            ); 
            return array;
        }catch(error){
            console.log(error);
            database.destroy();
        }
    }

    async deleteAll(objeto){  
        try{
            if(objeto.hasAny){
                await this.database.from(this.tableName).del();
            }
        }catch(error){
            console.log(`Error: ${error}`);
            database.destroy();
        }
    }
}

createTableProductos('products');
createTableMensajes('messages');

const productosContenedor = new Contenedor(databaseProducts, 'products')
const messageContenedor = new Contenedor(databaseMessages, 'messages')

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', async socket => {
    console.log(`Se conecto un nuevo Cliente con ID: ${socket.id}`);

        const products = await productosContenedor.getAll();
        socket.emit('server:data', products);

        const messages = await messageContenedor.getAll();
        socket.emit('server:message', messages);

    socket.on('client:product', async product =>{
        await productosContenedor.add(product);
        const newProduct = await productosContenedor.getAll();
        io.emit('server:data', newProduct);
    })

    socket.on('client:borrarProduct', async obj => {
        await productosContenedor.deleteAll(obj);
        const newProduct = await productosContenedor.getAll();
        io.emit('server:data', newProduct);
    })

    socket.on('client:borrarMessages', async obj => {
        await messageContenedor.deleteAll(obj);
        const newMessage = await messageContenedor.getAll();
        io.emit('server:message', newMessage);
    })

    socket.on('client:message', async message => {
        await messageContenedor.add(message);
        const newMessage = await messageContenedor.getAll();
        io.emit('server:message', newMessage);
    })
});



