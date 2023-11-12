require('dotenv').config();
const express = require('express');
const router = express.Router();
const {
  MASTER_ADMIN, MASTER_PASSWORD,
} = process.env;

router.get('/', (req, res) => {
	res.render('login');
})

router.post('/', (req, res) => {
	const data = req.body;
	console.log(req.session)
	req.session.valido = true;
	console.log(data);
	if (data.mail == MASTER_ADMIN && data.password == MASTER_PASSWORD) {
		res.redirect('/home');
		/*res.json({
			success: true,
			message: 'Validado'
		});*/
		return;
	}

	
	res.json({
		success: false,
		message: 'Correo o contraseña invalidos'
	});
})


module.exports = router;