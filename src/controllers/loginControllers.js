import  path  from "path";

const getRegister = (req, res) => {
    console.log('entre al getRegister');
    res.render(path.join(process.cwd(), './public/views/register.ejs') /* { user } */);
}

const failLogin = (req,res) => {
    res.render(path.join(process.cwd(), './public/views/failLogin.ejs') /* { user } */);
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

const getLogin = (req, res) => {
    res.render(path.join(process.cwd(), './public/views/login.ejs'));
}


const getHome = (req, res) => {
    
    res.render(path.join(process.cwd(), './public/views/home.ejs'));
}


export {getRegister, failLogin, getLogout, getLogin, getHome};