import { schema } from 'normalizr';


const authorSchema = new schema.Entity('author', {}, {idAttribute: 'email'});

const messageSchema = new schema.Entity('text', {authorSchema}, {idAttribute: 'id'});

const postSchema = new schema.Entity(
    'posts', 
    {
    mensajes: [messageSchema]
    },
    {idAttribute: 'id'}
);

export default postSchema;