const db = require('../database/models/index.js');
const { GetAllProducts } = require('../helpers/getAllProducts');

const addProduct = async (req, res) => {
    // Objetos del formulario
    const { name, price, code, categoryId, description } = req.body;
    // Archivos del formulario
    const files = req.files;

    try {
        // Crear objetos con los valores
        let values = {
            name,
            price,
            code,
            categoryId,
            description,
        };

        if (Object.values(values).includes('')) {
            res.json({
                success: false,
                message: 'Hubo un error con la información suministrada',
            });
            return;
        }

        let product = await db.product.create(values);

        for (const file of files) {
            let values = {
                destination: file.destination,
                path: file.path,
                originalName: file.originalname,
                filename: file.filename,
                mimetype: file.mimetype,
                productId: product.id,
            };
            await db.image.create(values);
        }

        if (product) {
            // Respuesta el endpoint
            const products = await GetAllProducts();

            // TODO:
            // Enviar una notificación al cliente luego de crear un producto
            res.redirect('/home');
        } else {
            return res.json({
                error: true,
                msg: 'Ocurrio un error al guardar la información',
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({
            error: true,
            msg: 'Ocurrio un error al guardar la información',
        });
    }
};

const deleteProduct = async (req, res) => {
    let { id } = req.body;

    try {
        if (id.trim() != '') {
            let product = await db.product.destroy({
                where: {
                    id: parseInt(id),
                },
            });

            return res.json({
                error: false,
                msg: 'El producto fue eliminado exitosamente',
            });
        } else {
            console.log('El identificador esta vacio');
        }
    } catch (error) {
        return res.json({
            error: true,
            msg: 'Ocurrio un error',
        });
    }
};

const viewProduct = async (req, res) => {
    /*    const { id } = req.params;

    console.log(id);

    product = await db.product.findOne({
        where: {
            id: id,
        },
    });

    res.render('viewProduct', {
        product,
    });*/

    const { id } = req.params;
    // Obtener todos los registros de la base de datos
    let product = await db.product.findOne({
        where: {
            id,
        },
        include: [db.image, db.category],
    });

    const productJson = product.toJSON();
    console.log('-----MOSTRANDO EL PRODUCTO ------');
    console.log(productJson);

    res.render('viewProduct', {
        product: productJson,
    });
};

module.exports = {
    addProduct,
    deleteProduct,
    viewProduct,
};
