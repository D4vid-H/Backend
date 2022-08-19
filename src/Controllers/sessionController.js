let nameUser = '';
import  path  from "path";

const redirect = (req, res) => {
    res.redirect('/api/home')
}

const getIndex = (req, res) => {
    res.redirect('/login');
}

const getUser = async (req, res) => {
    //const nombre = await req.session?.user; //no me trae el usuaro
    if(nameUser) {
        console.log('hay usuario en atlas');
        return res.json(nameUser)
    } else {

        console.log('NO hay usuario en atlas');
     return res.json('none')
    }
}

const getHome = (req, res) => {
    res.redirect('/home/index');
}

const postLogin = (req, res) => {
    console.log(req.body.email);
    console.log(req.body.password);
    /* if (req.isAuthenticated()) {
        //nameUser = req.session?.user;
        res.redirect('/api/home');
    } else {
        console.log("user NO logueado");
        res.redirect('/api/registro');;
      } */
      res.send('chau');
}

const getRegister = (req, res) => {
    console.log('entre al getRegister');
    res.render(path.join(process.cwd(), './public/views/register.ejs') /* { user } */);
}

const postRegister = (req, res) => {
    //req.session.user = req.body.user;
    console.log(req.body.email);
    console.log(req.body.password);
    res.send('hola')
    //res.redirect('/api/login');
}

const getLogout = (req, res) =>{
    const user = req.session?.user;
    if(user){
        req.session.destroy( (error) => {
            if(!error) {
              res.render(path.join(process.cwd(), './public/views/logout.ejs'), { user });
            }
            else {
             res.send({status: 'Logout Error', body: error});
            }
        })
    }  else {
        return res.redirect('/api/');
    } 
}

const failLogin = (req,res) => {

    res.render(path.join(process.cwd(), './public/views/failLogin.ejs') /* { user } */);
}

export { getIndex, getLogout, getUser, redirect, postLogin, getHome, failLogin, postRegister, getRegister };