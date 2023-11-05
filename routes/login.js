const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('login');
})

router.post('/', (req, res) => {
	const data = req.body;

	console.log(data);

	res.json({'ok': true});
})


module.exports = router;