import mongoose from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';


const productSchema = new mongoose.Schema({
    title: String,
    price:String,
    description: String,
    category: String,
    image: String,
    sold: Boolean,
    sales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sale' }],
    dateOfSale: Date

});

productSchema.plugin(mongooseAggregatePaginate);


export const Product = mongoose.model("Product", productSchema);