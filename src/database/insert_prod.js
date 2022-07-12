const database = require ('./database.js');

const inserProd = async () => {
    try{
        const prod = [
            {title: 'lapiz', thumbnail: 'www1', price: 200},
            {title: 'goma', thumbnail: 'www1', price: 250},
            {title: 'fibron', thumbnail: 'www1', price: 230},
            {title: 'crayon', thumbnail: 'www1', price: 120}
        ]
        //await database('products').truncate()
        await database('products').insert(prod)
        console.log('se insertaron datos');
        database.destroy();
    } catch (error){
        console.log(error);
        database.destroy();
    }

};

inserProd();