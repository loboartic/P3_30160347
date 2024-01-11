const { GetAllProducts } = require("../helpers/getAllProducts");


const home = async (req, res) => {
    
    products = await GetAllProducts()

    res.render("home", { products });
};

module.exports = {
    home
}