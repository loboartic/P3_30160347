const { GetAllProducts } = require("../helpers/getAllProducts");

// Controlador para HOME
const home = async (req, res) => {
    products = await GetAllProducts();

    return res.render("home", { products });
};

module.exports = {
    home,
};
