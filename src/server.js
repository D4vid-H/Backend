import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import router from './routers/index.js';
import fetch from "node-fetch";
import mongoose from 'mongoose';
import config from './config.js';
import Message from './mongoDB/mongoConnect.js';
import { normalize } from 'normalizr';
import postSchema from './normalized/normalizr.js'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { Strategy as LocalStrategy} from 'passport-local';
import User from './model/model.js';
import bcrypt from 'bcrypt';
import { redirect } from './Controllers/sessionController.js';


await mongoose.connect(config.mongoose)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT;
const app = express();
const serverExpress = app.listen(port, error => {
    if(error){
        console.log(`Servidor caido, con error: ${error}`);
    }else{
        console.log(`Servidor On-LINE escuchando en puerto: ${port}`);
    }
});
const io = new Server(serverExpress);

const mensajes = async () => {
    const arraymessages = await Message.find();
        if(arraymessages.length !== 0){
            let i = 0;
            const nuevoArray = arraymessages.map( doc => {
                i++
                const obj = { id: i, author: doc?.author, text: doc?.text }
                return obj;
            });
            const normalizedPost = normalize( nuevoArray , [postSchema]);
        return normalizedPost;
        }
}

function hashPassword(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function isValidPassword(reqPassword, dbPassword) {
    return bcrypt.compareSync(reqPassword, dbPassword)
}

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())
/* app.use(
    session({
        store:MongoStore.create({ mongoUrl: 'mongodb+srv://root:root1234@coderhouse.vi3s2vw.mongodb.net/sessions?retryWrites=true&w=majority', mongoOptions }),
        secret:'coderhouse',
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie:{
            maxAge: 10000,
        },
    })
); */

app.use(
    session({
        store:MongoStore.create({ mongoUrl: 'mongodb+srv://root:root1234@coderhouse.vi3s2vw.mongodb.net/passport?retryWrites=true&w=majority', mongoOptions }),
        secret:'coderhouse',
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie:{
            HttpOnly: false,
            secure: false,
            maxAge: 10000,

        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

const register = new LocalStrategy({ passReqToCallback: true}, 
    async (req, username, password, done) => {
        console.log('entre al Strategy');
        try {
          const existingUser = await User.findOne({ username });
    
          if (existingUser) {
            return done(null, null);
          }
    
          const newUser = {
            username,
            password: hashPassword(password),
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          };
    
          const createdUser = await User.create(newUser);
    
          done(null, createdUser);
        }catch(error) {
            console.log('Error en el registro del usuario');
            done('Error al registrar usuario', null);
        }
});

const login = new LocalStrategy({ passReqToCallback: true}, 
    async (req, done) => {
    console.log('entre al Strategy');
    try {
        const user = await User.findOne({ username });
    
        if (!user || !isValidPassword(password, user.password)) {
          return done(null, null);
        }
    
        done(null, user);
    }catch(error){
        console.log('Error Login', error);
        done('Error Login', null);

    }
});

passport.use('register', register);
passport.use('login', login);

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser((id, done) => {
    modelUser.findById(id, done);
})

app.use('/login', express.static(path.join(__dirname, '../public/views')));
app.use('/home/index', express.static(path.join(__dirname, '../public')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '../public/views');

app.use('/api', router);
app.use('*', redirect);

io.on('connection', async socket => {
    console.log(`Se conecto un nuevo Cliente con ID: ${socket.id}`);

        const Producto = await fetch("http://localhost:8080/api/productos-test");
        const ProductoJSON = await Producto.json();
        socket.emit('server:data', ProductoJSON);

        const messages = await mensajes();
        socket.emit('server:normalizedMsg', messages);

        const name = await fetch('http://localhost:8080/api/user')
        const user = await name.json();
        socket.emit('server:cookiID', user)

    socket.on('client: actualizarTabla', async () => {
        const Producto = await fetch("http://localhost:8080/api/productos-test");
        const ProductoJSON = await Producto.json();
        io.emit('server:data', ProductoJSON);
    })

    socket.on('client:borrarMessages', async obj => {
        await messageContenedor.deleteAll(obj);
        const newMessage = await messageContenedor.getAll();
        io.emit('server:message', newMessage);
    }) 

    socket.on('client:msgNormalizr', async message => {
            const mensaje = new Message(message)
        await mensaje.save();
            const messages = await mensajes();
        io.emit('server:normalizedMsg', messages);
    })
});



