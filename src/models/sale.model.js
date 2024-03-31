import mongoose from "mongoose";
import { Product } from "./product.model.js";

const saleSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    dateOfSale: Date
});

export const Sale = mongoose.model("Sale", saleSchema);