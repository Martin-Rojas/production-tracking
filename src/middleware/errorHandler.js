export const handlingError = (error, req, res, next) => {
   if (error.name === "CastError") {
      return res.status(400).json({
         error: "Invalid production run ID",
      });
   }
   console.error("Error caught by middleware:", error);
   return res.status(500).json({ error: "Internal server error" });
};
