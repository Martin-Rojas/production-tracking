import express from "express";
import {
   createProductionRun,
   getProduction,
   getProductionRun,
} from "../controllers/productionController.js";

const router = express.Router();

router.post("/", createProductionRun);
router.get("/", getProduction);
router.get("/:id", getProductionRun);

export default router;
