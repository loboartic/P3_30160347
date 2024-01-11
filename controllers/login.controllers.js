// Login principal
const login = (req, res) => {
	res.render("login");
};

// Autentificación del usuario
const loginAuthenticate = (req, res) => {
	const data = req.body;

	if (data.mail == MASTER_ADMIN && data.password == MASTER_PASSWORD) {
		res.redirect("/home");
		return;
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
