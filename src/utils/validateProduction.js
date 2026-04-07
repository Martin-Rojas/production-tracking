// Validate Request Exists
export const validateRequest = (req, res) => {
   if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is required" });
   }
};

// Validate all fields require
export const fieldsRequired = (req, res) => {
   if (
      req.body.operator !== "" &&
      req.body.wireType !== "" &&
      !req.body.coilsProduced &&
      req.body.palletId !== ""
   ) {
      return res.status(400).json({ error: "All fields must be required" });
   }
};

// Validate Wire Type
export const validateWireType = (req, res) => {
   const validWireTypes = ["316/045", "302/038", "302/045", "430/045"];
   if (!validWireTypes.includes(req.body.wireType)) {
      return res.status(400).json({ error: "Invalid wire type" });
   }
};

// Validate coilsProduced
export const validateCoilsProduced = (req, res) => {
   const coils = Number(req.body.coilsProduced);
   if (!Number.isFinite(coils) || coils < 0) {
      return res.status(400).json({
         error: "Invalid coil count",
      });
   }
};
