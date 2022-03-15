const http = require('http');
const Jimp = require('jimp');
const fs = require('fs');
const url = require('url');
const { grayscale } = require('jimp');

http
    .createServer((req, res) => {
        /* 2. El servidor debe disponibilizar una ruta raíz que devuelva un HTML con el formulario
        para el ingreso de la URL de la imagen a tratar. */
        if (req.url == '/') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            fs.readFile('index.html', 'UTF8', (err, html) => {
                res.end(html)
            });
        }
        /* 3. Los estilos de este HTML deben ser definidos por un archivo CSS alojado en el
        servidor. */
        if (req.url == '/style') {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            fs.readFile(__dirname+'/assets/css/style.css', (err, css) => {
                res.end(css)
            })
        }
        /* 4. El formulario debe redirigir a otra ruta del servidor que deberá procesar la imagen
        tomada por la URL enviada del formulario con el paquete Jimp. La imagen debe ser
        procesada en escala de grises, con calidad a un 60% y redimensionada a unos 350px
        de ancho. Posteriormente debe ser guardada con nombre “newImg.jpg” y devuelta al
        cliente. */
        if(req.url.includes('/imagen')){
            const params = url.parse(req.url, true).query;
            const img = params.img;

            Jimp.read(`${img}`,(err, image) =>{
                image
                    .grayscale()
                    .quality(60)
                    .resize(350, Jimp.AUTO)
                    .writeAsync('newImg.jpg')
                    .then(() =>{
                        fs.readFile('newImg.jpg', (err, imagen) => {
                            res.writeHead(200, { 'Content-Type': 'image/jpeg'});
                            res.end(imagen);
                        });
                    })
            });
        }
    })
    .listen(3000, () => console.log('Servidor encendido'));