import mongoose from "mongoose";
import Collections from "../database/collections.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const ProductModel = mongoose.model(Collections.PRODUCTS, productSchema);
export default ProductModel;
