import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    { 
        author: {
            id: { type: Number, require: true, unique: true},
            nombre: { type: String, require: true},
            apellido: { type: String, require: true}, 
            edad: { type: Number, require: true}, 
            alias: { type: String, require: true},
            avatar: { type: String, require: true}
        },
        text: { type: String, require: true},
        hasAny: { type: Boolean, require: true}
    }
    
);

const Message = mongoose.model('messages', messageSchema);

export default Message;