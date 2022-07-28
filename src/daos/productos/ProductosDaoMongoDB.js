import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js";

export default class ProductoDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super("productos", {
        code: { type: String, required: true },
        name: { type: String, required: true },
        category: { type: String, required: false },
        information: { type: String, required: false },
        picturUrl: { type: String, required: false },
        stock: { type: String, required: true },
        price: {type: Number, required: true },
        id: {type: Number, required: true },
        description: { type: String, required: true },
        timestamp: {type: Date, required: true },
        admin: {type: Boolean, required: true}
    });
  }

};
