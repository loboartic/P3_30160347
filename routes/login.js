const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('login');
})

router.post('/', (req, res) => {
	// const { mail, password } = req.body;
	console.log(req.body)
	res.render('login');
})


module.exports = router;