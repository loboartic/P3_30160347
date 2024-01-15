require("dotenv").config();
const { MASTER_ADMIN, MASTER_PASSWORD, PORT } = process.env;

// Login principal
const login = (req, res) => {
	res.render("login");
};

// Autentificación del usuario
const loginAuthenticate = (req, res) => {
	const { mail, password } = req.body;

	if (mail === MASTER_ADMIN && password === MASTER_PASSWORD) {
		return res.redirect("/home");
	}

	res.json({
		success: false,
		message: "Correo o contraseña invalidos",
	});
};

// Exportar los modulos de login
module.exports = {
	login,
	loginAuthenticate,
};
