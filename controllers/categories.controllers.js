const db = require("../database/models/index.js");

// Ruta para añadir una categoria
const homeCategories = async (req, res) => {
	res.render("categorys");
};

// Añadir categories
const addCategories = async (req, res) => {
	console.log("Agregando categoria...");
	console.log(req.body);

	const { name } = req.body;
	try {
		const category = await db.category.create({ name });
		console.log(category);
		res.json({ status: "Categoria agregada", id: category.id });
	} catch {
		res.json({ status: "Hubo un error en la petición" });
	}
};

const getAllCategories = async (req, res) => {
	const allCategories = await db.category.findAll();

	let categoryList = [];

	for (category of allCategories) {
		categoryList.push({
			id: category.id,
			name: category.name,
		});
	}
	res.json({ status: "ok", data: categoryList });
};

module.exports = {
	homeCategories,
	addCategories,
	getAllCategories,
};
