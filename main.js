const yargs = require('yargs');
const child = require('child_process');

/* 1. El servidor debe ser levantado por instrucción de una aplicación Node que use el
paquete Yargs para capturar los argumentos en la línea de comando. Se deberá
ejecutar el comando para levantar el servidor solo si el valor de la propiedad “key” es
la correcta (123). */

const key = 123;

const argv = yargs.command(
    'acceso',
    'Key de acceso para levantar el servidor',
    {
        keys:{
            describe: 'Key',
            demand: true,
            alias: 'k',
        },
    },
    (args) => {
        args.keys == key ? child.exec(`node index.js`, (err, stdout) => {
            err ? console.log(err) : console.log(stdout);
        })
        :
        console.log('Clave Incorrecta');
    }
).help().argv;