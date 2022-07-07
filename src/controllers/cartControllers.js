import { cartContenedor } from "../class/Container.js";
const cartContainer = new cartContenedor('../carts.txt');
import { prodContenedor } from "../class/Container.js";
const prodContainer = new prodContenedor('../products.txt');


export const getCart = async (req, res) => {
    try{
        const id = Number(req.params.id);
        res.json(await cartContainer.getAll(id));
    }catch(error){
        console.log( `se produjo el siguiente error: ${error}`);
        res.sendStatus(500)
    }
}

export const postCart = async (req, res) => {
    try{
        res.json(await cartContainer.add());
    }catch(error){
        console.log( `se produjo el siguiente error: ${error}`);
        res.sendStatus(500)
    }
}

export const putCart = async (req, res) => {
    try{
        const id = Number(req.params.id);
        const id_prod = Number(req.params.id_prod);
        if(typeof(await prodContainer.getById(id_prod)) === typeof({})){            
            res.json(await cartContainer.set(id, await prodContainer.getById(id_prod)));
        }else{
            res.send(await prodContainer.getById(id_prod));
        }
    }catch(error){
        console.log(`se produjo el siguiente error: ${error}`);
        res.sendStatus(500)
    }
}

export const deleteCart = async (req, res) => {
    try{
        const id = Number(req.params.id);
        const id_prod = Number(req.params.id_prod);
        if(id_prod){
            res.json(await cartContainer.deteleById(id, id_prod));
        }else{            
            res.json({deleteCartId: await cartContainer.deleteCart(id)});
        }
    }catch(error){
        console.log( `se produjo el siguiente error: ${error}`);
        res.sendStatus(500)
    }
}