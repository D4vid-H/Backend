export default function checkAuth(req, res, next) {
    console.log('entre al middelware de chackAuth');
    if(req.isAuthenticated()){
        next();
    }else {
        console.log('me ridirige a login');
        res.redirect('/api/login');
    }

}