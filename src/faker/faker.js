import {faker} from '@faker-js/faker'

const getProducts = (req, res) => {
    try{
        const products = [];
    
        for(let i=0; i < 5; i++){
            const product = {
                title: faker.animal.cat(),
                thumbnail: faker.image.cats(640, 480, true),
                price: faker.commerce.price(),
                hasAny: true
            }
            products.push(product);
        }
        res.json(products);
    }catch(e){
        console.log( `se produjo el siguiente error: ${e}`);
        res.sendStatus(500)
    }
}


export default getProducts;