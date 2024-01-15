// Multer para el guardado de imagenes
const multer = require('multer');

// Congiguración de multer
const storage = multer.diskStorage({
    // Función que guarda en la carpeta de destino
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    // Función que procesa el nombre del archivo
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

// Exportar upload para ser utilizado mas adelante en las routes necesarias
module.exports = {
    upload: multer({ storage: storage }),
};
