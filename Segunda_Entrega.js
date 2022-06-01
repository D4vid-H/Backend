const fs = require('fs');
/* Manejo de Archivos en Javascript */

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
        fs.promises.writeFile(`./${fileName}`, '')
    }

    async save(objeto) {
        let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
        if(!data) {
            objeto.id = 1
            const arr = [objeto]
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(arr))
            return objeto.id
        } else {
            data = JSON.parse(data);
            objeto.id = data.length + 1
            data.push(objeto)
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(data))
            return objeto.id
        }
    }

    async getById(id){
        let dato = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, 'utf-8'));
        const uno = dato.find(pro => pro.id === id)   
        if(uno){
            console.log(uno);
        }else{
            console.log(`El numero de id: ${id} no existe.`);
        }
    }

    async getAll(){
        let dato = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, 'utf-8'));
        const uno = dato.map(obj => obj)
        console.log(uno ? uno : 'No hay productos');
    }

    async deteleById(id){
        let dato = JSON.parse(await fs.promises.readFile(`./${this.fileName}`, 'utf-8'));
        const uno = dato.filter(pro => pro.id !== id);
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(uno));
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
const productos = new Contenedor('produxtos.txt')

await productos.save({name: "shampoo"});
await productos.save({name: "jabon"});
await productos.save({name: "dentrifico"});
await productos.getById(1);
await productos.getAll();
await productos.deteleById(2);
await productos.deleteAll();
}

main();