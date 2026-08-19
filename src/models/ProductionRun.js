import mongoose from "mongoose";

const { Schema } = mongoose;

const productionRunSchema = new Schema(
   {
      palletId: {
         type: String,
         required: true,
      },
      date: {
         type: Date,
         required: true,
      },
      operator: {
         type: String,
         required: true,
      },
      wireType: {
         type: String,
         required: true,
      },
      coilsProduced: {
         type: Number,
         required: true,
      },
      boxesUsed: {
         type: Number,
         required: true,
      },
      zipTiesUsed: {
         type: Number,
         required: true,
      },
      palletsCreated: {
         type: Number,
         required: true,
      },
   },
   { timestamps: true },
);

// Create the model
const Production = mongoose.model("Production", productionRunSchema);
export default Production;
