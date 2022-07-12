const  database = require('./database.js');

const createProdTable = async () => {
    try{
        await database.schema.dropTableIfExists('products');

        await database.schema.createTable('products', table => {
            table.increments('id').primary();
            table.string('title', 50).notNullable();
            table.string('thumbnail', 1000).notNullable();
            table.integer('price').notNullable();
        });

        console.log('car table created!');

        database.destroy();
    }catch(error){
        console.log(error);
        database.destroy();
    }

}

createProdTable();