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
 }

const products = new Contenedor();

const getProductos = (req, res) => {
    try{
        const productos = products.get();
        console.log(productos);
        res.render('products.hbs', {message: 'holaaa'})
        /* if(productos.length !== 0){
            res.render('products.hbs', {productos, hasAny: true});
        }else{
            res.render('products.hbs', {hasAny: false});
        } */
    }
    catch(e){
        console.log('el error es: ', e ); 
        res.sendStatus(500);
    }
}

const getIdProductos = (req, res) => {
    try{
        const id = Number(req.params.id);
        const prodX = products.getId(id);
        if(!prodX){
           res.json({ error : 'producto no encontrado' });
        }
        res.render('products.hbs', {prodX , hasAny: true});
    }
    catch(e){
        console.log('el error es: ', e ); 
        res.sendStatus(500);
    }
}

const addProductos = (req, res) =>{
    try{
        const { title, price, thumbnail } = req.body
        const producto = {title, price, thumbnail}
        products.add(producto);
        res.redirect("/home");
    }
    catch(e){
        console.log('el error es: ', e ); 
        res.sendStatus(500);
    }
}

module.exports = {
    getProductos,
    getIdProductos,
    addProductos
}