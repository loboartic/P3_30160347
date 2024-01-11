// ===== IMPORTACIONES =====
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require("path");
const morgan = require("morgan");
const ejs = require("ejs");
// Base de datos
const db = require("./database/models/index.js");
// Multer para el guardado de imagenes
const multer = require("multer");

// ===== RUTAS =====
const landing = require('./routes/landing.js')
const login = require("./routes/login.js");
const home = require("./routes/home.js");
const product = require("./routes/product.js");


const { GetAllProducts } = require("./helpers/getAllProducts");
// VARIABLES DE ENTORNO
const { MASTER_ADMIN, MASTER_PASSWORD, PORT } = process.env;

// ===== INSTANCIAS =====
const app = express();

// ==== SETS ====
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(
    session({
        secret: "987f4bd6d4315c20b2ec70a46ae846d19d0ce563450c02c5b1bc71d5d580060b",
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000,
        },
    }),
);
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Manejadores de rutas =====
app.use('/', landing)
app.use("/login", login);
app.use("/home", home);
app.use("/product/", product)

// Congiguración de multer
const storage = multer.diskStorage({
    // Función que guarda en la carpeta de destino
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    // Función que procesa el nombre del archivo
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });
console.log(upload);


// Añadir una categoria
app.post("/add/category", async (req, res) => {
    // Obtener la data de la petic
    const data = req.body;

    // Guardar un producto
    let category = await db.category.create(data);

    // Retornar una respuesta JSON
    res.json({
        success: true,
        message: "¡Categoria creada exitosamente!",
        data: {
            category_id: category.id,
            name: category.name,
        },
    });
});

app.post("/upload-image", upload.array("imagen"), async (req, res) => {
    const imageUrl = req.file;
    console.log(req.body);
    console.log(imageUrl);
    const nuevaImagen = await db.image.create({ url: imageUrl });
    console.log(nuevaImagen);
    return res.status(200).json({
        message: "Imagen subida y URL guardada en la base de datos",
        imageUrl,
    });
});

// ==== SERVER ====
app.listen(3000, () => {
    console.log("Servidor iniciado en http://localhost:3000");
});
