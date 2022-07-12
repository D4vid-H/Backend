const database = require ('./database');

const updateProd = async() => {
    try{
        await database.from('products').select('*').where('price', '<=', 200).update({price: 1999})

        /*
        await Promise.all(array.map( async obj => {
            await database.from('products').where('id', '=', obj.id).update({price: (obj.price / 2)})
        }))
        */
        
        console.log('Update producto Id 1');

        database.destroy();
    }catch(error){
        console.log(error);
        database.destroy();
    }

};

updateProd();