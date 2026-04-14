import mongoose from "mongoose";
import User from "./user.model.js";
import Product from "./product.model.js";
const cartSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
        unique: true
    },
    item: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Product,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price:{
                type:Number,
                required:true,
                min:1
            },
            name:{
                type:String,
                // ref:Product,
                // required:true,
                // default:"product"
            }
        }
    ],
    totalprice:{
        type: Number,
        default: 0
    }

},{timestamps:true});
const Cart = mongoose.model("Cart", cartSchema)
export default Cart;