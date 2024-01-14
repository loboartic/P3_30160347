const db = require("../database/models/index.js");
const { GetAllProducts } = require("../helpers/getAllProducts");

const addProduct = async (req, res) => {
    const { name, price, code, categoryId, description } = req.body;

    try {
        // Crear objetos con los valores
        let values = {
            name,
            price,
            code,
            categoryId,
            description,
        };

        if (Object.values(values).includes("")) {
            res.json({
                success: false,
                message: "Hubo un error con la información suministrada",
            });
            return;
        }

        let product = await db.product.create(values);

        if (product) {
            // Respuesta el endpoint
            const products = await GetAllProducts();

            // TODO:
            // Enviar una notificación al cliente luego de crear un producto
            res.redirect("/home");
        } else {
            res.json({
                success: false,
                message: "Ocurrio un error al guardar la información",
            });
        }
    } catch (error) {
        res.json({
            success: false,
            message: "Ocurrio un error al guardar la información",
        });
    }
};

const deleteProduct = async (req, res) => {
    let { id } = req.body;

    if (id.trim() != "") {
        let product = await db.product.destroy({
            where: {
                id: parseInt(id),
            },
        });

        return res.json({
            error: false,
            msg: "El producto fue eliminado exitosamente",
        });
    } else {
        console.log("El identificador esta vacio");
    }
};

const viewProduct = async (req, res) => {
    const { id } = req.params;

    console.log(id);

    product = await db.product.findOne({
        where: {
            id: id,
        },
    });

    console.log(product);

    res.render("viewProduct", {
        product,
    });
};

module.exports = {
    addProduct,
    deleteProduct,
    viewProduct,
};
