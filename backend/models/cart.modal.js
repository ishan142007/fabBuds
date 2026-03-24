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
        // type:number
        // default:'0',


    }

},{timestamps:true});
cartSchema.pre("save",function(next){
this.totalprice =this .item.reduce((acc,curr)=>{
    return acc + (curr.quantity * curr.productId.price);
    next();
},0)

})
const Cart = mongoose.model("Cart", cartSchema)
export default Cart;