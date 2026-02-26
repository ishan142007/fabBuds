import Cart from "../modals/cart.modal.js";
import Product from "../models/product.model.js";
export const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ UserId: req.user._id });
        if (!cart) {
            cart = await Cart.create({ UserId: req.user._id, item: [] });
        }
        return res.status(200).json({
            message: "Cart retrived successfully",
            sucess: true,
            cart: cart
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error", sucess: false,
            error: error
        });
    }
}

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
            return res.status(400).json({
                message: "ProductId and quantity are required",
                success: false,
            })
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "product not found",
                success: false
            })
        }
        if (product.stack < quantity) {
            return res.status(400).json({
                message: "Insufficiant stack",
                success: false
            })
        }
        let cart = await Cart.findOne({ UserId: req.user._id });
        if (!cart) {
            cart = await Cart.create({ UserId: req.user._id, item: [] });
        }
        const existingItemIndex = cart.item.findIndex(item => item.productId.toString() === productId.toString());
        if (existingItemIndex > -1) {
            cart.item[existingItemIndex].quantity += quantity;
        } else {
            cart.item.push({ productId, quantity, price: product.price });
        }
        await cart.save();
        return res.status(200).json({
            message: "item added to cart",
            success: true,
            cart: cart
        })

    }

    catch (error) {
        return res.status(500).json({
            message: "server error",
            success: false,
            error: error

        })

    }

}
export const updateCart = async (req, res) => {
    try {
        const { itemId } = req.body;
        const { quantity } = req.body;
        if (!quantity || quantity < 1) {
            return res.status(400).json({
                message: "Invalid quantity",
                success: false
            })
        }
        let cart = await Cart.findOne({ UserId: req.user._id });
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                success: false
            })
        }
        const itemIndex = cart.item.findIndex(item => item._id.toString() === itemId.toString());
        if (itemIndex > -1) {
            cart.item[itemIndex].quantity = quantity;
        } else {
            return res.status(404).json({
                message: "Item not found in cart",
                success: false
            })
        }
        await cart.save();
        return res.status(200).json({
            message: "Cart updated successfully",
            success: true,
            cart: cart
        })


    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message
        })

    }

}

export const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.body;

        if (!itemId) {
            return res.status(400).json({
                message: "ItemId is required",
                success: false
            })
        }

        let cart = await Cart.findOne({ UserId: req.user._id });
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                success: false
            })
        }

        const itemIndex = cart.item.findIndex(item => item._id.toString() === itemId.toString());
        if (itemIndex > -1) {
            cart.item.splice(itemIndex, 1); // 1 item ko remove kero
        } else {
            return res.status(404).json({
                message: "Item not found in cart",
                success: false
            })
        }

        await cart.save();
        return res.status(200).json({
            message: "Item removed from cart successfully",
            success: true,
            cart: cart
        })

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message
        })
    }
}
export const clearCart=async(req,res)=>{
    try{
        let cart=await Cart.findOne({UserId:req.user._id});
        if (!cart){
            return res.status(404).json({
                message:"Cart not found",
                success:false
            })
        }
        cart.item=[];
        await cart.save();
        return res.status(200).json({
            message:"Cart cleared successfully",
            success:true,
            cart:cart
        })
    }catch(error){
        return res.status(500).json({
            message:"Server error",
            success:false,
            error:error.message
        })
    }
}

