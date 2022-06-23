const express = require('express');
const app = express();
const path = require('path')
const route = require('./routes/index')
const port = 8080;


app.listen(port, ()=> {
    console.log(`Servidor encendido, escuchando puerto: ${port}`);
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

/* app.set('views', path.join(__dirname, "./views"))
app.set('views engine', 'pug') */

app.set('views', path.join(__dirname, './views'))
app.set('views engine', 'ejs')

app.use('/', route)