import mongoose from "mongoose";
import User from "./user.model.js";

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        min: 0
    },
    category:{
        type: String,
        required: true,
        trim: true
    },
    stock:{
        type: Number,
        required: true,
        min: 0
    },
    imageUrl:{
        type: String,
        default: "https://via.placeholder.com/150"
    },
    rating:{
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviewCount:{
        type: Number,
        default: 0,
        min: 0
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    }
},{timestamps: true});

const Product = mongoose.model("Product",productSchema);

export default Product;