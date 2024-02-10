const db = require('../database/models/index.js');

// Ruta para añadir una categoria
const homeCategories = async (req, res) => {
	let categorysQuery = await db.category.findAll();

	// Array vacio para ser enviado al controlador
	let categorysList = [];

	// Iterar en cada uno de los registros para crear un objeto y agregarlo
	// a la variable de productos
	for (category of categorysQuery) {
		let vals = {
			id: category.id,
			name: category.name,
		};
		categorysList.push(vals);
	}
	res.render('categorys', { categorys: categorysList });
};

// Añadir categories
const addCategories = async (req, res) => {
	const { name_category } = req.body;
	console.log(req.body);
	console.log(name_category);

	try {
		// Verificamos que no sea un campo vácio
		if (name_category.trim() === '') {
			return res.json({
				error: true,
				msg: 'Hay un campo vácio',
			});
		}

		// Creamos una categoria
		const category = await db.category.create({ name: name_category });
		console.log(category)
		// Retornamos la categoria creada
		return res.json({
			error: false,
			msg: '¡Categoria agregada con exito!',
			data: { id: category.id },
		});
	} catch {
		return res.json({
			error: true,
			msg: 'Hubo algo procesar al procesar la información',
		});
	}
};

const getAllCategories = async (req, res) => {
	try {
		// Obtener todas las categorias
		const allCategories = await db.category.findAll();

		// Lista de categorias
		let categoryList = [];

		// Guardar cada una de las categorias en un objeto con id y name, para pushearlo a categoryList
		for (category of allCategories) {
			categoryList.push({
				id: category.id,
				name: category.name,
			});
		}

		// Retornar una respues correcta y una data de la lista de categorias
		return res.json({
			error: false,
			msg: 'Lista de categorias obtenida de forma exitosa',
			data: categoryList,
		});
	} catch (error) {
		console.log(error);
		return res.json({
			error: true,
			msg: 'Ocurrio un error al obtener las categorias',
		});
	}
};

module.exports = {
	homeCategories,
	addCategories,
	getAllCategories,
};
