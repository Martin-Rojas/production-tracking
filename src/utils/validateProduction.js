import { error } from "node:console";
import { VALID_WIRE_TYPES } from "./productionConstants.js";

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
   if (!VALID_WIRE_TYPES.includes(wireType)) {
      return "Invalid wire type";
   }

   // Validate coilsProduced
   const coils = Number(coilsProduced);
   if (!Number.isFinite(coils) || coils < 0) {
      return "Invalid coil count";
   }

   return null;
};

export const validateProductionUpdate = (data) => {
   // Body is not empty
   if (Object.keys(data).length === 0) {
      return { error: "Need to provide fields." };
   }

   // Check for invalid fields
   const validFields = ["operator", "wireType", "coilsProduced", "palletId"];

   const requestedFields = Object.keys(data);

   const invalidFields = requestedFields.filter(
      (field) => !validFields.includes(field),
   );

   if (invalidFields.length > 0) {
      return {
         error: "Invalid field",
         fields: invalidFields,
      };
   }

   if (data.operator !== undefined) {
      // Validate operator
      if (data.operator === "") {
         return { error: "Operator can not be blank" };
      }
      if (typeof data.operator !== "string") {
         return { error: "Operator must be a string" };
      }
   }

   if (data.wireType !== undefined) {
      // Validate Wire Types
      if (!VALID_WIRE_TYPES.includes(data.wireType)) {
         return { error: "Invalid wire type" };
      }
   }

   if (data.coilsProduced !== undefined) {
      // Validate coilsProduced
      if (!Number.isFinite(data.coilsProduced)) {
         return { error: "Must be a numeric value" };
      }
      if (!Number.isInteger(data.coilsProduced)) {
         return { error: "Coils must always be whole numbers" };
      }
      if (data.coilsProduced < 0) {
         return { error: "Invalid coil count" };
      }
   }

   if (data.palletId !== undefined) {
      // Validate palletId
      if (data.palletId === "") {
         return { error: "PalletId can not be blank" };
      }
      if (typeof data.palletId !== "string") {
         return { error: "PalletId must be a string" };
      }
   }
   return null;
};
