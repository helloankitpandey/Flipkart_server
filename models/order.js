import mongoose, { Schema } from "mongoose";


const ItemSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: { type: Number, required: true },
});

const OrderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: {type: [ItemSchema], required: true },
    address: { type: String },
    deliveryDate: { type: Date, reuired: true },
    status: {
        type: String,
        enum: [
            "Order Placed",
            "Shipping",
            "Out for Delivery",
            "Delivered",
            "Cancelled",
        ],
        default: "Order Placed",
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.Schema("Order", OrderSchema );

export default Order;