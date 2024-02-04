const db = require('../database/models/index.js');

async function GetAllProducts() {
	// Buscar todos los productos incluyendo la tabla de imagenes y categorias
	let products = await db.product.findAll({
		include: [db.image, db.category],
	});

	// Array vacio para ser enviado al controlador
	let productsList = [];

	// Iterar en cada uno de los registros para crear un objeto y agregarlo
	// a la variable de productos
	for (const product of products) {
		let vals = {
			id: product.id,
			name: product.name,
			price: product.price,
			code: product.code,
			images: product.images,
		};
		productsList.push(vals);
	}

	return productsList;
}

module.exports = { GetAllProducts };
