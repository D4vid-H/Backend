import ContenedorSQL from "../../contenedores/ContenedorSQL.js";

export default class CarritosDaoSQL extends ContenedorSQL{
    constructor(){
        super('carritos')
    }
};