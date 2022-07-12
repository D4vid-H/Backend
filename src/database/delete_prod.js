const database = require ('./database');

const deleteProd = async() => {
    try{
        await database.from('products').del();
        //await database.from('products').where('id', '=', 1).del()

        /* const prodFromDatabase  = await database.from('products').select('*');
        for( const prod of prodFromDatabase){
            if((prod.title === 'lapiz' && prod.thumbnail === 'www1')){
                await database.from('products').where('id', '=', prod.id).del();
            }

        } */
        
        console.log('se borro products');

        database.destroy();
    }catch(error){
        console.log(error);
        database.destroy();
    }

};

deleteProd();