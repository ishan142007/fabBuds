import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    items: [
        {
            ProductId: {
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

            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["processing", "shipped", "deliverd", "cancelled"],
        default: "processing"
    }
}, { timestamps: true });
const Order = mongoose.model("Order", orderSchema);
export default Order;