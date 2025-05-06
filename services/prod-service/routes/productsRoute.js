const router = require("express").Router();

const { getAllProducts } = require("../controllers/productsController");

router.get("/products", getAllProducts);

module.exports = router;
