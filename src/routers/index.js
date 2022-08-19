import Router from 'express';
import passport from 'passport';
import getProducts from '../Controllers/faker.js';
import checkAuth from '../helpers/checkAuthenticated.js';
import { getIndex, getLogout, getUser, redirect, postLogin, getHome, failLogin, postRegister, getRegister } from '../Controllers/sessionController.js';

const router = Router();

router.get('/productos-test', getProducts);
//router.get('*', redirect);

router.get('/user', getUser)
router.get('/home', checkAuth, getHome);

router.get('/login', getIndex).post('/login', passport.authenticate('login', {failureRedirect: '/api/faillogin'}), postLogin);

router.get('/register', getRegister).post('/register', passport.authenticate('register', {failureRedirect: '/api/faillogin'} ),  postRegister);

router.get('/logout', getLogout);

router.get('/faillogin', failLogin);

export default router;