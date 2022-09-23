import "dotenv/config";

let ProductoDao;
let CarritoDao;
let Opcion = process.env.DATABASE;

switch (Opcion) {
/*   case "firebase":
    const { default: ProductoDacFirebase } = await import(
      "./productos/ProductosDaoFirebase.js"
    );
    const { default: CarritoDacFirebase } = await import(
      "./carritos/CarritosDaoFirebase.js"
    );
    console.log('Entro al Index de Firebase');

    ProductoDao = new ProductoDacFirebase();
    CarritoDao = new CarritoDacFirebase();

    break; */

    case "mongoose":
    const { default: ProductoDaoMongoDB } = await import(
      "./productos/producto.schem.js"
    );
    const { default: CarritoDaoMongoDB } = await import(
      "./carritos/carrito.schem.js"
    );
    console.log('Entro al Index de Mongo');

    ProductoDao = new ProductoDaoMongoDB();
    CarritoDao = new CarritoDaoMongoDB();

    break;

    /* case "sql":
    const { default: ProductDaoSQL } = await import(
      "./productos/ProductosDaoSQL.js"
    );
    const { default: CarritoDaoSQL } = await import(
      "./carritos/CarritosDaoSQL.js"
    );
    console.log('Entro al Index de SQL');

    ProductoDao = new ProductDaoSQL();
    CarritoDao = new CarritoDaoSQL();

    break;

    default :
    const { default: ProductDacArchivo } = await import(
      "./productos/ProductosDaoArchivo.js"
    );
    const { default: CarritoDacArchivo } = await import(
      "./carritos/CarritosDaoArchivo.js"
    );

    ProductoDao = new ProductDacArchivo();
    CarritoDao = new CarritoDacArchivo();

    break; */
}



export { ProductoDao, CarritoDao };
