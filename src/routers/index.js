import Router from 'express';
import getProducts from '../faker/faker.js';

const router = Router();

router.get('/productos-test', getProducts);

export default router;