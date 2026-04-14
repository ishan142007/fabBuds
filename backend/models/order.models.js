import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true,

            },
            name:{
                type:String,
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ["processing", "shipped", "delivered", "cancelled"],
        default: "processing"
    },
    paymentStatus:{
        type:String,
        enum:["pending","done","cancelled"],
        default:"pending"
    }
}, { timestamps: true });
const Order = mongoose.model("Order", orderSchema);
export default Order;