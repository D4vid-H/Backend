import  path  from "path";

let nameUser = '';

const redirect = (req, res) => {
    res.redirect('/api/home')
}

const getlogin = (req, res) => {
    if (req.isAuthenticated()) {
        nameUser = req.user;
        res.redirect('/api/home');       
      } else {
        res.redirect('/login');
      }
}

const getUser = async (req, res) => {
   if (nameUser.length !== 0) {
        return res.json(nameUser);
    }else{
        return res.json('none');
    }
}

const getHome = (req, res) => {
    res.redirect('/home/index');
}

const postLogin = (req, res) => {
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

const failLogin = (req,res) => {
    res.render(path.join(process.cwd(), './public/views/failLogin.ejs') /* { user } */);
}

export { getlogin, getLogout, getUser, redirect, postLogin, getHome, failLogin, postRegister, getRegister };