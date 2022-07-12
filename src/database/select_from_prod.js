const database = require ('./database');

const selectProd = async() => {
    try{
        const prodsFromDatabase = await database.from('products').select('*')//select('title', 'price')
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


selectProd();