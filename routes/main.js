const express = require("express");
const router = express.Router();

class Contenedor {
   constructor(){
      this.productos = [

      ];
   }

   get(){
      return this.productos.map(prod => prod);
   }

   getId(id){
      return this.productos.find(prod => prod.id === id);
   }

   add(producto){
      if(this.productos.length === 0){
         producto.id = 1;
         this.productos.push(producto);
      }else {
         let id = this.productos[this.productos.length - 1].id;
         producto.id = ++id;
         this.productos.push(producto);
      }
      return producto;
   }

   set(id, producto){
      this.productos = this.productos.map(prod => 
         (prod.id === id) 
         ? {...prod, title: producto.title, price: producto.price, thumbnail: producto.thumbnail} 
         : prod);
   }

   delete(id){
      this.productos = this.productos.filter(prod => prod.id !== id);
   }

}

const products = new Contenedor();

router.get('/productos', (req, res) => {
   res.json(products.get())
})

router.get('/productos/:id', (req, res) => {
   const id = Number(req.params.id);
   const prodX = products.getId(id);
   if(!prodX){
      res.json({ error : 'producto no encontrado' });
   }
   res.json(products.getId(id));
})

router.post('/productos', (req, res) =>{
   const { title, price, thumbnail } = req.body
   const producto = {title, price, thumbnail}
   res.json(products.add(producto));
})

router.put('/productos/:id', (req, res) => {
   const id = Number(req.params.id);
   const { title, price, thumbnail} = req.body;
   const prodX = products.getId(id);
   if(!prodX){
      res.json({ error : 'producto no encontrado' });
   }
   const producto = {title, price, thumbnail};
   producto.id = id;
   products.set(id, producto);
   res.sendStatus(202);
})

router.delete('/productos/:id', (req, res) => {
   const id = Number(req.params.id);
   const prodX = products.getId(id);
   if(!prodX){
      res.json({ error : 'producto no encontrado' });
   }
   products.delete(id);
   res.sendStatus(202)
})

module.exports = router;