const express = require("express");
const app = express();
const port = 8080;
const rutas = require("./routes/main.js");
const { engine } = require("express-handlebars");
const path = require("path");
/* const fs = require('fs'); */



app.listen(port, () => {
  console.log(`servidor escuchando en port: ${port}`);
});

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: path.join(__dirname, './views/layout/main.hbs'),
  layoutsDir: path.join(__dirname, './views/layout'),
  partialsDir: path.join(__dirname, './views/partials')
}));

app.set('views', path.join(__dirname, '/views'));
app.set('views engine', 'hbs');

app.use(express.static("public"));

/* app.engine("ntl", function (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) {
      return callback(new Error(err));
    }
    const rendered = content
    .toString()
    .replace("^^nombre&&", "" + options.nombre + "")
    .replace("^^apellido&&", "" + options.apellido + "")
    .replace("^^fecha&&", "" + options.fecha + "")
    .replace("&&title&&", "" + options.title + "")
      .replace("&&message&&", "" + options.message + "")
      .replace("&&author&&", "" + options.author + "")
      .replace("&&version&&", "" + options.version + "");
      return callback(null, rendered);
    });
}); */


/* app.set("views", path.join(__dirname, "./views"));
app.set("views engine", 'ntl'); */

app.use("/", rutas);