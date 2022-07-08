# 1° Pre Entrega Proyecto Final
    Se realiza la primer pre-entrega del proyacto final.

## Informacion.
    Se entrega el proyecto en un repositorio, los archivos de productos.txt y carts.txt se encuentran con datos. Se pueden agregar los productos, desde postman y desde el localhost:8080/. Los carritos solo se pueden agregar desde postman.

## Instalacion.
    Se debe realizar la descarga del proyecto desde Github y correr el siguiente comando para instalar las dependencias necesarias.

```bash
npm install
```

## Ejecucion.
    El proyecto se debe ejecutar con el siguiente comando para levantar el servidor.

```bash
npm start
```

## Uso de la API.
    Desde Postman, se puden usar los siguientes comandos para probar los diferentes endpoints. Cada endpoint aplica desde las siguientes direcciones.
    * localhost:8080/api/productos -> Maneja los endpoints para leer, agregar, actualizar y borrar productos. De los cuales solo para leer los productos no hay q ser administrador.
    * localhost:8080/api/carrito -> Maneja los endpoints para crear, leer, actualizar y borrar carritos de compra como los productos dentro del carrito.

### Endpoint Productos
```
* GET - Existen 2 opciones. #1 /api/productos/0, con la direccion /0 estamos solicitando el endpoint para listar todos los productos.
                            #2 /api/productos/:id, con la direccion /:id solicitamos el producto por el ID.

* POST - (/api/productos/) Crea un producto con los siguientes datos -##importante: para poder crear un producto se debe agregar una clave: admin, valor: true- name, description, code, foto (url), price, stock.

* PUT - (/api/productos/:id) Actualiza un producto por su ID. -##importante: para poder actualizar un producto se debe agregar una clave: admin, valor: true- Los siquientes datos se puede actualizar: name, description, code, foto (url), price, stock.

*DELETE - (/api/productos/:id) Borra un producto por su ID. -##importante: para poder borrar un producto se debe agregar una clave: admin, valor: true-

```

### Endpoint Carrito
```
* GET - (/api/carrito/:id/productos) Lista los productos dentro del carrito selecionado por ID.

* POST - (/api/carrito/) Crea un carrito con un arreglo productos, donde almacenaremos los productos del carrito.

* PUT - (/api/carrito/:id/productos/:id) Incorpora productos por Id al carrito seleccionado.

*DELETE - Existen 2 opciones. #1 /api/carrito/:id, este endpoint borra el carrito seleccionado por Id.
                              #2 /api/carrito/:id/productos/:id, borra un producto por su ID del carrito seleccionado por ID.

```