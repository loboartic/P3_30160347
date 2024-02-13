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

        if (files.length > 0) {
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
        }

        // Verificamos la información del producto
        if (product) {
            // Hacemos una busqueda del producto por su id
            let productData = await db.product.findOne({
                where: {
                    id: parseInt(product.id),
                },
                include: [db.image, db.category],
            });

            // Convertimos el resultado en un JSON
            const data = productData.toJSON();

            // Retornamos la información al frontend
            return res.json({
                error: false,
                msg: 'El producto ha sido creado con exito',
                data,
            });
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
            msg: 'Ocurrio un error al procesar la información',
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

const allProducts = async (req, res) => {
    const productList = await GetAllProducts();

    return res.json(productList);
};

module.exports = {
    addProduct,
    deleteProduct,
    viewProduct,
    allProducts,
};
