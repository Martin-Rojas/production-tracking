import express from "express";
import productionRoutes from "./routes/productionRoutes.js";

const app = express();
const PORT = 3000;

// middleware to read JSON body
app.use(express.json());

// routes
app.use("/production", productionRoutes);
app.use("/production", productionRoutes);
app.use("/production/:id", productionRoutes);
app.use("/production/:id", productionRoutes);

// start server
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
