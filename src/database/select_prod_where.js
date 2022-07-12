const database = require ('./database');

const selectProdWhere = async() => {
    try{
        const prodsFromDatabase = await database.from('products').select('*').where('price', '>=', 201)//.orderBy('price', 'desc'/*'asc'*/)
        prodsFromDatabase.forEach( prod => {
            console.log(`
            Nombre: ${prod.title}
            Imagen: ${prod.thumbnail}
            Precio: ${prod.price}
            `);
        })

        //console.log('car table created!');

        database.destroy();
    }catch(error){
        console.log(error);
        database.destroy();
    }

};

selectProdWhere();