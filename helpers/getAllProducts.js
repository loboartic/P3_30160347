const db = require("../database/models/index.js");

async function GetAllProducts() {
	// Obtener todos los registros de la base de datos
	let productsQuery = await db.product.findAll();

	// Array vacio para ser enviado al controlador
	let products = [];

	// Iterar en cada uno de los registros para crear un objeto y agregarlo
	// a la variable de productos
	for (product of productsQuery) {
		let vals = {
			id: product.id,
			name: product.name,
			price: product.price,
			code: product.code,
		};
		products.push(vals);
	}

	return products;
}

module.exports = { GetAllProducts };
