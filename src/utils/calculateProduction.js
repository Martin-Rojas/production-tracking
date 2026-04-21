export const calculateProduction = (coilsProduced) => {
   // business calculations
   const boxesUsed = coilsProduced / 6;
   const zipTiesUsed = coilsProduced * 4;
   const palletsCreated = boxesUsed / 63;
   return { boxesUsed, zipTiesUsed, palletsCreated };
};
