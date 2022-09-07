import  path  from "path";
import { fork } from 'child_process';
import { cpus } from "os";

const forked = fork('./src/helpers/fork.js');

let nameUser = '';

const redirect = (req, res) => {
    res.redirect('/api/home')
}

const getlogin = async (req, res) => {
    if (req.isAuthenticated) {
        res.redirect('/api/home');       
      } else {
        res.redirect('/login');
      }
}

const getUser = async (req, res) => {
    console.log(req.user);
   if (nameUser.length !== 0) {
        return res.json(nameUser.email);
    }else{
        return res.json('none');
    }
}

const getHome = (req, res) => {
    res.redirect('/home/index');
}

const postLogin = async (req, res) => {
    nameUser = req.user;
    if (req.isAuthenticated()) {
        res.redirect('/api/home');
    } else {
        res.redirect('/api/registro');;
    }
}

const getRegister = (req, res) => {
    res.render(path.join(process.cwd(), './public/views/register.ejs') /* { user } */);
}

const postRegister = (req, res) => {
    res.redirect('/api/login');
}

const getLogout = (req, res) => {
        req.logout(function(err) {
            if (err) {
              return next(err);
            }
        });
        res.render(path.join(process.cwd(), './public/views/logout.ejs'), { user: nameUser.username });
}

const failLogin = (req, res) => {
    res.render(path.join(process.cwd(), './public/views/failLogin.ejs') /* { user } */);
}

const getInfo = (req, res) => {
    res.json({
        Argumentos_de_entrada: process.argv,
        Nombre_de_la_plataforma: process.platform,
        Versión_de_node: process.version,                                               
        Memoria_total_reservada: process.memoryUsage(),
        Carpeta_del_proyecto: process.cwd(),
        Process_id: process.pid,
        Path_de_ejecución: process.execPath,
        Procesadores: cpus().length

    })
}

const getCalc = (req, res) => {
    const cant = req.query.cant ? Number(req.query.cant) : 0;
    try{
        forked.on('message', msg => {
            if(msg === 'ready'){
                forked.send({mensaje: cant})  
            }else{
                res.json(msg);
            }
        })
        
    }catch (error){
        console.log(`error salida del fork hijo: ${error}`);
    }
}

export { getlogin, getLogout, getUser, redirect, postLogin, getHome, failLogin, postRegister, getRegister, getInfo, getCalc };