const express = require("express");
const { getProductos, getIdProductos, addProductos } = require('../Controllers/productsControllers')
const { Router } = express;
const router = Router();


router.get('/productos', getProductos)

router.get('/productos/:id', getIdProductos)

router.post('/productos', addProductos)

module.exports = router;