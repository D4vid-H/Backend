import express from 'express';
import { getProducts, postProducts, putProducts, deleteProducts } from '../controllers/productsControllers.js';
const prodRouter = express.Router();

/* const police = (req, res, next) => {
    const validPass = req.body.admin;
    if(validPass === 'true'){
        next();
    }else{
        res.json({ error: -1, descripcion: 'no autorizado, debe ser Administrador para esta accion.' })
    }
}


prodrouter.get('/:id', getProducts);

prodrouter.post('/', police, postProducts);

prodrouter.put('/:id', police, putProducts);

prodrouter.delete('/:id', police, deleteProducts); */
prodRouter.route('/all').get(getProducts);

export default prodRouter;