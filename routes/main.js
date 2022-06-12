const express = require("express");
const router = express.Router();
const multer = require("multer");


class Contenedor {
   constructor(){
      this.productos = [];
   }

   get(){
      return this.productos.map(prod => prod.id);
   }

   getId(id){
      return this.productos.find(prod => prod.id === id);
   }

   add(producto){
      let id = (this.products.length === 0) ? 1 : this.products[this.products.length - 1].id;
      producto.id = id;
      this.productos.push(producto);
   }

   set(id, producto){
      this.products = this.products.map(prod => {
         if(prod.id === id){
            prod = producto;
         }
      });
   }

   delete(id){
      this.products = this.products.filter(prod => prod.id !== id);
   }

}

const products = new Contenedor();

/* let id = products.find(prod => {   
   prod.id === products[products.length - 1].id
}); */

/* let id = (products.productos.length === 0) ? 1 : products.productos[products.productos.length - 1].id; */


/* function middlewareAddId(req, res, next) {
   req.params.id
} */

router.get('/productos', (req, res) => {
   res.json(products.get)
})

router.get('/productos/:id', (req, res) => {
   const id = Number(req.params.id);
   /* prod = products.find(prod => prod.id === id) */
   if(!prod){
      res.json({ error : 'producto no encontrado' });
   }
   res.json(products.getId(id));
})

router.post('/productos', (req, res) =>{
   const { producto } = req.body
   /* if(!producto.id){
      producto.id = ++id;
      products.push(producto);
      return res.statusCode(201);
   } */
   products.add(producto);
   res.statusCode(201);
})

router.put('/productos/:id', (req, res) => {
   const id = Number(req.params.id);
   const { producto } = req.body;
   const prodX = products.getId(id);
   if(!prodX){
      res.json({ error : 'producto no encontrado' });
   }
   producto.id = id;
  /*  products = products.map(prod => {
      if(prod.id === id){
         prod = producto;
      }
   }) */
   products.set(id, producto);
   res.statusCode(202);
})

router.delete('/productos/:id', (req, res) => {
   const id = Number(req.params.id);
   const prodX = products.getId(id);
   if(!prodX){
      res.json({ error : 'producto no encontrado' });
   }
   /* products = products.filter(prod => prod.id !== id); */
   res.statusCode(202)
})


module.exports = router;