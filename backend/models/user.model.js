import mongoose from "mongoose";
import bcrypt from "bcrypt";

const addressSchema = mongoose.Schema({
    phone: {
        type: String,
    },
    pincode: {
        type: String,
    },
    address: {
        type: String,
    },
}, { _id: false });

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    role: {
        type: String,
        enum: ["user", "admin", "seller"],
        default: "user",
    },
    address: [addressSchema],
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.log("password error", error);
        next(error);
    }
});

const User = mongoose.model("User", userSchema);

export default User;