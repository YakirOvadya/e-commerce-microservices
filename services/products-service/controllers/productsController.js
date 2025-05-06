const getAllProducts = async (req, res) => {
  try {
    const products = [
      { id: 1, name: "Laptop" },
      { id: 2, name: "Smartphone" },
      { id: 3, name: "Headphones" },
    ];

    res.status(200).json(products);
  } catch (err) {
    console.error("Fetch products error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllProducts,
};
