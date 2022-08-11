import Router from 'express';
import getProducts from '../Controllers/faker.js';
import {pass} from '../Controllers/middelwareController.js';
import { getIndex, getLogout, getUser, redirect, postLogin, getHome } from '../Controllers/sessionController.js';

const router = Router();

router.get('/productos-test', getProducts);
router.get('/', redirect);

router.get('/user', getUser)
router.get('/home', pass, getHome);
router.get('/login', getIndex);
router.post('/login', postLogin)
router.get('/logout', getLogout);

export default router;