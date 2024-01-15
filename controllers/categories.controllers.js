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
	const { name } = req.body;

	try {
		const category = await db.category.create({ name });

		return res.json({
			error: false,
			msg: 'Categoria agregada',
			data: { id: category.id },
		});
	} catch {
		return res.json({ error: true, msg: 'Hubo un error en la petición' });
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
