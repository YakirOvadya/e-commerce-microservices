const express = require("express");

const app = express();

app.use(express.json()); // instead of bodyParser

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.get("/products", (req, res) => {
  const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Smartphone" },
  ];
  res.status(200).json(products);
});

app.listen(3000, () => {
  console.log("Products service listening on port 3000");
});
