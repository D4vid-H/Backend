const express = require("express");
const router = express.Router();
const multer = require("multer");


router.get('/productos', (req, res) => {
   res.json(products)
})

router.get('/productos/:id', (req, res) => {
   const id = Number(req.params.id);
   products.find(prod => prod.id === id)
})

module.exports = router;