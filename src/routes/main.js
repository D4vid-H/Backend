const {Router} = require('express');
const router = Router();

const product = [{title: 'Bombilla', 
thumbnail: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/001/020/467/products/a38beb41-a08a-4861-8ee0-b494c3ec4edd1-7026da60ce1b070a6b15935423510859-1024-1024.jpeg', 
price: 200},
{title: 'Mate', thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Mate_en_calabaza.jpg/800px-Mate_en_calabaza.jpg', price: 550},
{title: 'Yerba', thumbnail: 'https://unciencia.unc.edu.ar/wp-content/blogs.dir/31/files/sites/4/2016/08/UNCiencia_Yerba_Mate-AR-03_a1-1920x944-c-default.jpg', price: 700}]

const champs = [ {name: 'Jarvan VI'} , {name: 'Lucio'}, {name: 'Jay'}]

const html = {
    titulo: "coder!",
    nombre: "davi",
    apellido: "hilton",
    edad: "40",
    email: "1234@1234.com",
    telefono: "12344566",
  };

/* router.get('/', (req, res)=>{
    res.render('index.ntl', {title: 'Hola Mundo', message: 'Esto es lo que estoy aprendiendo'})
});

router.get('/cte1', (req, res)=>{
    res.render('plantilla1.ntl', {title: 'Hola Mundo', message: 'Esto es lo que estoy aprendiendo', author: 'david hillton', version: 'v5.5'})
});

router.get('/cte2', (req, res)=>{
    res.render('plantilla2.ntl', {nombre: 'Hola Mundo', apellido: 'aprendiendo', fecha: `${Date.now()}`})
}); */

router.get('/home', (req, res) => {
    res.render('index.hbs', html /* { title: 'david', message: 'Hola mundo'} */);
})

router.get('/product/:indice', (req, res) => {
    const indice = Number(req.params.indice);
    console.log(indice);
    res.render('product.hbs', product[indice]);
})

router.get('/champs', (req, res) => {
    
    res.render('champs.hbs', {champs , hasAny: true});
})

module.exports =  router;