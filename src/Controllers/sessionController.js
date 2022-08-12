let nameUser = '';
import  path  from "path";

const redirect = (req, res) => {
    res.redirect('/api/home')
}

const getIndex = (req, res) => {
    const User = req.session?.user;
    if(User){ 
       return res.redirect('/api/home');
    }else{
       return res.redirect('/login');
    }
}

const getUser = async (req, res) => {
    //const nombre = await req.session?.user; //no me trae el usuaro
    if(nameUser) {
        return res.json(nameUser)
    } else {
     return res.json('none')
    }
}

const getHome = (req, res) => {
    res.redirect('/home/index');
}

const postLogin = (req, res) => {
    req.session.user = req.body.user;
    nameUser = req.session?.user;
    res.redirect('/api/home');
}

const getLogout = (req, res) =>{
    const user = req.session?.user;
    if(user){
        req.session.destroy( (error) => {
            if(!error) {
              res.render(path.join(process.cwd(), './public/desafio/logout.ejs'), { user });
            }
            else {
             res.send({status: 'Logout Error', body: error});
            }
        })
    }  else {
        return res.redirect('/api/');
    } 
}

export { getIndex, getLogout, getUser, redirect, postLogin, getHome };