require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: [
      "https://mytech-backend.vercel.app",
      "http://localhost:3000",
      "http://localhost:5000",
    ],
  })
);

connectDB();

app.use(express.json());
  
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  