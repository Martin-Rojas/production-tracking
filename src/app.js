import express from "express";
import productionRoutes from "./routes/productionRoutes.js";
import { connectDB, disconnectDB } from "./config/db.js";
import { Production } from "./models";

const app = express();
const PORT = 3000;

// Connect to DB
await connectDB();

// middleware to read JSON body
app.use(express.json());

// routes
app.use("/production", productionRoutes);

// start server
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
