import {
  yellow,
  red,
  green,
  bgWhite,
  italic,
  bold,
} from "https://deno.land/std@0.160.0/fmt/colors.ts";

// const envVariable = Deno.env.get("HOME");

// console.log("Variable de entorno", envVariable);

const params = Deno.args;
console.log("Argumentos:", params);
let max = 0;
let min = 100;
let prom = 0;

const ejer = async (arreglo: Array<string>): Promise<void> => {
  arreglo.forEach((param) => {
    max < Number(param) ? (max = Number(param)) : null;
    min > Number(param) ? (min = Number(param)) : null;
    prom = prom + Number(param);
  });

  await Deno.writeTextFile(
    "resultados.dat",
    `*************
    Numeros: ${bgWhite(String(arreglo))}
    Minimo: ${bgWhite(yellow(italic(String(min))))}
    Maximo: ${bgWhite(red(italic(String(max))))}
    Promedio: ${bgWhite(green(bold(String(prom / arreglo.length))))}
    **************`
  );
};

ejer(params);

const contenido = await Deno.readTextFile("./resultados.dat");

console.log(contenido);
