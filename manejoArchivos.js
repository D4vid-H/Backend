const fs = require('fs');
/* Manejo de Archivos en Javascript */

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
        fs.promises.writeFile(`./${fileName}`, '')
    }

    async save(objeto) {
        let datos = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
        if(!datos) {
            objeto.id = 1
            const arreglo = [objeto]
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(arreglo))
            return objeto.id
        } else {
            datos = JSON.parse(datos);
            objeto.id = datos.length + 1
            datos.push(objeto)
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(datos))
            return objeto.id
        }
    }

    async getById(id){
        let datos = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, 'utf-8'));
        const objeto = datos.find(pro => pro.id === id)   
        if(objeto){
            console.log(objeto);
        }else{
            console.log(`El numero de id: ${id} no existe.`);
        }
    }

    async getAll(){
        let datos = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, 'utf-8'));
        const objetos = datos.map(obj => obj)
        console.log(objetos ? objetos : 'No hay productos');
    }

    async deteleById(id){
        let datos = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, 'utf-8'));
        const arreglo = datos.filter(pro => pro.id !== id);
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(arreglo));
        console.log(`El Objeto con Id: ${id} fue eliminado`);
        console.log(JSON.parse(await fs.promises.readFile(`./${this.fileName}`, 'utf-8')));
    }

    async deleteAll(){        
        await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(''));
        console.log(`Se eliminaron todos los objetos.`);
    console.log(JSON.parse(await fs.promises.readFile(`./${this.fileName}`, 'utf-8')));
    }

}

async function main() {
const productos = new Contenedor('productos.txt')

await productos.save({title: "VF-1 valkyrie", price: 9070, thumbnail: "https://m.media-amazon.com/images/I/61rlbVttP9L._AC_SL1400_.jpg"});
await productos.save({title: "SDF1", price: 8890, thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_908521-MLA49988783649_052022-F.webp"});
await productos.save({title: "REGULT", price: 58900, thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_770654-MLA50143789808_052022-F.webp"});
await productos.getById(1);
await productos.getAll();
await productos.deteleById(2);
await productos.deleteAll();
}

main();