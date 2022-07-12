const knex = require('knex');
const options = {
    client: 'sqlite3',
    connection:{
        filename: './db/ecommerce.sqlite'
    },
    useNullAsDefault: true
}

const databaseConnection = knex(options);

module.exports = databaseConnection;