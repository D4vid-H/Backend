import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js";

export default class UsersDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super("users", {
      username: { type: String, required: true },
      password: { type: String, required: false },
      avatar: { type: String, required: false },
      address: { type: String, required: false },
      celphone: { type: Number, required: false },
      name: { type: String, required: false },
      age: { type: Number, required: false },
    });
  }
}
