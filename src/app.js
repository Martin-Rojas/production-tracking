import express from "express";
import productionRoutes from "./routes/productionRoutes.js";
import { connectDB, disconnectDB } from "./config/db.js";
import Production from "./models/ProductionRun.js";
import { handlingError } from "./middleware/errorHandler.js";

const app = express();
const PORT = 3000;

// Connect to DB
await connectDB();

// middleware to read JSON body
app.use(express.json());

// routes
app.use("/production", productionRoutes);

// Error-handling middleware MUST come after routes
app.use(handlingError);

// start server
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
