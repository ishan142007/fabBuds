import mongoose from "mongoose";
import User from "./user.model";
import Product from "./product.model";
const cartSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
        unique: true
    },
    item: [
        {
            ProductId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Product,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    totalprice:{
        default:0,


    }

},{timestamps:true});
cartSchema.pre("save",function(next){
this.totalprice =this .item.reduce((acc,curr)=>{
    return acc + (curr.quantity * curr.ProductId.price);
    next();
},0)

})
const Cart = mongoose.model("Cart", cartSchema)
export default Cart;