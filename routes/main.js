const express = require("express");
const app = express();



app.get('/productos', (req, res) => {
   res.json(products)
})

app.get('/productos/:id', (req, res) => {
   const id = Number(req.params.id);
   products.find(prod => prod.id === id)
})

module.exports = routes