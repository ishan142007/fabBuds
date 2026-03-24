
import Order from "../models/order.models.js";
import cart from "../models/cart.modal.js";
import Product from "../models/product.model.js";
export const createOrder = async (req, res) => {
    try {
        const { shippingaddress } = req.body;
        const cartItems = await cart.find({ UserId: req.user._id });
        if (!cart || cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty", success: false });
        }
        const orderItems = cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }));
        const orderData = {
            userId: req.user.id,
            item: orderItems,
            totalprice: cart.totalprice,
            orderstatus: "processing",
            paymentstaus: "pending",
            shippingaddress
        }
        const order = await Order.create(orderData);
        cart.items = [];
        cart.totalprice = 0;
        await cart.save();
        return res.status(200).json({ message: "Order created successfully", success: true, order });
        
        
        
        
    } catch (error) {
        return res.status(500).json({ message: "Server error", success: false, error });
        
    }
}
export const getOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found", success: false });
        }
<<<<<<< HEAD
        if (order.UserId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized access", success: false });
        }
        return res.status(200).json({ message: "Order fetched successfully", success: true, order });


    } catch (error) {
        return res.status(500).json({
            message: "server error",
            success: false,
            error: error


=======
        return res.status(200).json({message:"Order fetched successfully",success:true,order});
        
        
    }catch (error){
        return res.status(500).json({message:"server error",
            success:false,
            error:error
            
            
>>>>>>> 9fd0e48137bed4011283388bd15512c0b50c21ab
        })
    }
    
    
}
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Order fetched sucessfully",
            success: true,
            orders
        })
<<<<<<< HEAD

    } catch (error) {
        return res.status(500).json({
            message: "server error",
            error: error,
            success: false


=======
        
    }catch (error){
        return res.status(500).json({
            message:"server error",
            error:error,
            success:false
            
            
>>>>>>> 9fd0e48137bed4011283388bd15512c0b50c21ab
        })
        
    }
    
    
    
}
// import express from "express";
// import Order from "../models/order.models";
// import cart from "../models/cart.modal";
// import Product from "../models/product.model";
// export const createOrder = async (req, res) => {
//     try {
//         const { UserId, items, totalAmount,paymentStatus } = req.body;
//         if (!UserId || !items || !Array.isArray(items) || items.length === 0 || !totalAmount) {
//             return res.status(400).json({ message: "All required fields must be provided", success: false });
//         }

//         const order = await Order.create({ UserId, items, totalAmount, paymentStatus });
//         return res.status(200).json({ message: "Order created successfully", success: true, order });
//     } catch (error) {
//         return res.status(500).json({ message: "Server error", success: false, error });
//     }
// };

// export const getOrderById = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id).populate("UserId").populate("items.ProductId");
//         if (!order) return res.status(400).json({ message: "Order not found", success: false });
//         return res.status(200).json({ message: "Order fetched successfully", success: true, order });
//     } catch (error) {
//         return res.status(500).json({ message: "Server error", success: false, error });
//     }
// };

// export const getOrdersByUser = async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const orders = await Order.find({ UserId: userId }).populate("items.ProductId");
//         return res.status(200).json({ message: "User orders fetched", success: true, orders });
//     } catch (error) {
//         return res.status(500).json({ message: "Server error", success: false, error });
//     }
// };

// export const getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({}).populate("UserId").populate("items.ProductId");
//         return res.status(200).json({ message: "All orders fetched", success: true, orders });
//     } catch (error) {
//         return res.status(500).json({ message: "Server error", success: false, error });
//     }
// };

// export const updateOrderStatus = async (req, res) => {
//     try {
//         const { status } = req.body;
//         if (!status) return res.status(400).json({ message: "Status is required", success: false });

//         const updated = await Order.findByIdAndUpdate(req.params.id, { paymentStatus: status }, { new: true });
//         if (!updated) return res.status(404).json({ message: "Order not found", success: false });
//         return res.status(200).json({ message: "Order status updated", success: true, order: updated });
//     } catch (error) {
//         return res.status(500).json({ message: "Server error", success: false, error });
//     }
// };

// export const deleteOrder = async (req, res) => {
//     try {
//         const deleted = await Order.findByIdAndDelete(req.params.id);
//         if (!deleted) return res.status(404).json({ message: "Order not found", success: false });
//         return res.status(200).json({ message: "Order deleted", success: true, order: deleted });
//     } catch (error) {
//         return res.status(500).json({ message: "Server error", success: false, error });
//     }
// };

// export default {
//     createOrder,
//     getOrderById,
//     getOrdersByUser,
//     getAllOrders,
//     updateOrderStatus,
//     deleteOrder
// };