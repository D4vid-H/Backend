import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    { 
        author: {
            email: { type: String, required: true, unique: true},
            nombre: { type: String, required: false},
            apellido: { type: String, required: false}, 
            edad: { type: Number, required: false}, 
            alias: { type: String, required: false},
            avatar: { type: String, required: false}
        },
        text: { type: String, required: false}
    }
    
);

const Message = mongoose.model('messages', messageSchema);

export default Message;