import mongoose, { Schema } from "mongoose";


const CategorySchema = new Schema({
    name: { type: String, required: true },
    image_uri: { type: String, required: true },
    // here we use foreign key for adding category to product
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;