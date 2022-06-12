const express = require("express");
const router = express.Router();
const multer = require("multer");


class Contenedor {
   constructor(){
      this.productos = [];
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

/* let id = products.find(prod => {   
   prod.id === products[products.length - 1].id
}); */

/* let id = (products.productos.length === 0) ? 1 : products.productos[products.productos.length - 1].id; */


/* function middlewareAddId(req, res, next) {
   req.params.id
} */

/* const storage = multer.diskStorage({
   destination: (req, res, cb) => {
     cb(null, "files");
   },
   filename: (req, file, cb) => {
     cb(null, Date.now() + file.originalname);
   },
 });
 
 const upload = multer({ storage });
 
 router.post("/productos", upload.single("myfile"), (req, res, next) => {
   const file = req.file;
   if (!file) {
     const error = { message: "No hay nada q subir", statusCode: 400 };
     return next(error, req, res);
   }   
   next();
 }); */


router.get('/productos', (req, res) => {
   res.json(products.get())
})

router.get('/productos/:id', (req, res) => {
   const id = Number(req.params.id);
   console.log(id);
   const prodX = products.getId(id);
   if(!prodX){
      res.json({ error : 'producto no encontrado' });
   }
   res.json(products.getId(id));
})

router.post('/productos', (req, res) =>{
   const { title, price, thumbnail } = req.body
   const producto = {title, price, thumbnail}
   products.add(producto);
   res.sendStatus(201);
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