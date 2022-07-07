import express from 'express';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import prodrouter from './routers/productRouter.js';
import cartrouter from './routers/cartRouter.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT
const app = express();

app.listen(port, (error) =>{
    try{
        console.log(`Servidor On-Line escuchando en port: ${port}`);
    }catch(error){        
        console.log(`Se produjo el siguiente error: ${error}`);
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/productos', prodrouter);
app.use('/api/carrito', cartrouter);
