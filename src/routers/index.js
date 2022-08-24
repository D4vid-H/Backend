import Router from 'express';
import passport from 'passport';
import getProducts from '../Controllers/faker.js';
import checkAuth from '../helpers/checkAuthenticated.js';
import { getlogin, getLogout, getUser, redirect, postLogin, getHome, failLogin, postRegister, getRegister, getInfo, getCalc } from '../Controllers/sessionController.js';

const router = Router();

router.get('/productos-test', getProducts);
//router.get('*', redirect);

router.get('/user', getUser)
router.get('/home', checkAuth, getHome);

router.get('/login', getlogin).post('/login', passport.authenticate('login', {failureRedirect: '/api/faillogin'}), postLogin);

router.get('/register', getRegister).post('/register', passport.authenticate('register', {failureRedirect: '/api/faillogin'} ), postRegister);

router.get('/logout', getLogout);

router.get('/faillogin', failLogin);

router.get('/info', getInfo);

router.get('/randoms', getCalc);

export default router;