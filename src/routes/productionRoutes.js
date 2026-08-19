import express from "express";
import {
   createProductionRun,
   getProduction,
   getProductionRun,
   deleteProductionRun,
   updateProductionRun,
} from "../controllers/productionController.js";

const router = express.Router();

router.post("/", createProductionRun);
router.get("/", getProduction);
router.get("/:id", getProductionRun);
router.delete("/:id", deleteProductionRun);
router.put("/:id", updateProductionRun);

// Routes to migrate to MongoDB
router.post("/mongoDB", (req, res) => {
   res.send("It work to save new production Run");
});

export default router;
