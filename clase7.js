const express = require("express");
const app = express();
const PORT = 8080;

const frase = "Hola mundo como estan";
/* const frase = "Frase inicial"; */

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.get('/api/frase', (req, res) => {
    res.json({ frase});
});

app.get('/api/letras/:num', (req, res) => {
    const letras = frase.split('');
        const num = req.params.num;
     if(isNaN(num)){
         res.json({ error: "El parámetro no es un número" });
    }else if(num < letras.length){
         res.json({letra: letras[num]});
        return;
    }
    res.json({ error: "El parámetro está fuera de rango" });
});

app.get('/api/palabras/:num', (req, res) => {
    let palabras = frase.split(' ');
    const num = req.params.num;
    if(isNaN(num)){
        res.json({ error: "El parámetro no es un número" });
   }else if(num < palabras.length){
    res.json({palabra: palabras[num]});
       return;
   }
   res.json({ error: "El parámetro está fuera de rango" });    
}); */

//---------------------------------------------------------------------

/* app.get("/api/sumar/:num1/:num2", (req, res) => {
  const num1 = Number(req.params.num1);
  const num2 = Number(req.params.num2);
  const sumar = num1 + num2;
  res.json({ sumar });
});

app.get("/api/sumar", (req, res) => {
  const { num1, num2 } = req.query;
  const sumar = Number(num1) + Number(num2);
  res.json({ sumar });
});

app.get("/api/operacion/:op", (req, res) => {
  const operacion = req.params.op.split("");

  switch (operacion[1]) {
    case "+":
      res.json(Number(operacion[0]) + Number(operacion[2]));
      break;
    case "-":
      res.json(Number(operacion[0]) - Number(operacion[2]));
      break;
    case "*":
      res.json(Number(operacion[0]) * Number(operacion[2]));
      break;
    case "/":
      res.json(Number(operacion[0]) / Number(operacion[2]));
      break;
    default:
      res.send("no existe");
      break;
  }
}); */


app.get("/api/frase", (req, res) => {
    res.json({ frase });
  });

app.get("/api/palabras/:pos", (req, res) => {
    const palabras = frase.split(' ');
    const {pos} = req.params;
    const buscada = palabras[pos - 1]   
    res.json({ buscada });
  });

app.post('/api/palabras', (req, res) => {
  const {palabra} = req.body;
  console.log(palabra);
  let newFrase = frase.split(' ');
  newFrase.push(palabra);
  console.log(newFrase);
  res.json({agregada: palabra, pos: newFrase.indexOf(palabra)})
})

app.put('/api/palabras/:pos', (req, res) => {
  const posicion = req.params.pos;
  const {palabra}  = req.body;
  console.log(palabra);
  let newFrase = frase.split(' ');
  const anterior = newFrase[posicion];
  newFrase[posicion] = palabra;
  res.json({alctualizada: palabra, anterior })
})

app.delete('/api/palabras/:pos', (req, res) => {
  const posicion = Number(req.params.pos);
  console.log(posicion);
  let newFrase = frase.split(' ')
  newFrase[posicion - 1] = '';
  console.log(newFrase);
  res.sendStatus(200);
})