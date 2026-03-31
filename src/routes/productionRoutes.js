import express from "express";
import {
   createProductionRun,
   getProduction,
} from "../controllers/productionController.js";

const router = express.Router();

router.post("/", createProductionRun);
router.get("/", getProduction);

export default router;
