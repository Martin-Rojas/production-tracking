// import the model
import Production from "../models/ProductionRun.js";

// create a new document
export const createProductionMongoDB = (req, res) => {
   res.send(req.body);
};
