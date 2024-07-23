import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required:  true
    },
    categoryId: {
        type: Number,
        required: true
    }
});

const ProductModel = mongoose.models.products || mongoose.model("products", productSchema);

export default ProductModel;