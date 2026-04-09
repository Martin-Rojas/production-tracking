export const validateData = (data) => {
   // Validate Request Exists
   if (!data || Object.keys(data).length === 0) {
      return "Request body is required";
   }

   const { operator, wireType, coilsProduced, palletId } = data;
   // Validate all fields require
   if (!operator || !wireType || !coilsProduced || !palletId) {
      return "All fields must be required";
   }
   // Validate Wire Type
   const validWireTypes = ["316/045", "302/038", "302/045", "430/045"];
   if (!validWireTypes.includes(wireType)) {
      return "Invalid wire type";
   }

   // Validate coilsProduced
   const coils = Number(coilsProduced);
   if (!Number.isFinite(coils) || coils < 0) {
      return "Invalid coil count";
   }

   return null;
};
