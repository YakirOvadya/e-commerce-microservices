const express = require("express");

const app = express();

const productsRoute = require("./routes/productsRoute");

app.use(express.json()); // instead of bodyParser

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/api/auth", productsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Users service running on port ${PORT}`);
});
