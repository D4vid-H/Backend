import { prodContenedor } from "../class/Container.js";
const prodContainer = new prodContenedor('../products.txt');

export const getProducts = async (req, res) => {
    try{
        const id = Number(req.params.id);
            if(id !== 0){
                 res.json(await prodContainer.getById(id));
            }else{
                 res.json(await prodContainer.getAll());
            }
    }catch(error){
        console.log( `se produjo el siguiente error: ${error}`);
        res.sendStatus(500)
    }
}

export const postProducts = async (req, res) => {
    try{
        const newProducts = req.body;    
        res.json({id: await prodContainer.add(newProducts)});
    }catch(error){
        console.log( `se produjo el siguiente error: ${error}`);
        res.sendStatus(500)
    }
}

export const putProducts = async (req, res) => {
    try{
        const id = Number(req.params.id);
        const updateProduct = req.body;
        console.log(id);
        console.log(updateProduct);
        res.json(await prodContainer.set(id, updateProduct));
    }catch(error){
        console.log( `se produjo el siguiente error: ${error}`);
        res.sendStatus(500)
    }
}

export const deleteProducts = async (req, res) => {
    try{
        console.log('entre a delete');
        const id = Number(req.params.id);
        res.json (await prodContainer.deteleById(id));
    }catch(error){
        console.log( `se produjo el siguiente error: ${error}`);
        res.sendStatus(500)
    }
}

