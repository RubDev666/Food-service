import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    id: {
        type: Number, 
        required: true,
    },
    slug: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required:  true
    }
});

const CategoriesModel = mongoose.models.categories || mongoose.model("categories", categorySchema);

export default CategoriesModel;