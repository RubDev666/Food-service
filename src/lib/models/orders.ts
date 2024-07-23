import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    total: {
        type: Number,
        require: true
    },
    orders: [
        {
            _id: {
                type: String
            },
            price: {
                type: Number
            },
            quantity: {
                type: Number
            },
            subtotal: {
                type: Number
            }
        }
    ],
    isReady: {
        type: Boolean
    }
})

const OrderModel = mongoose.models.orders || mongoose.model("orders", orderSchema);

export default OrderModel;