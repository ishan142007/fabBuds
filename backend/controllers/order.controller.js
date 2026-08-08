
import Order from "../models/order.models.js";
import cart from "../models/cart.modal.js";
import Product from "../models/product.model.js";
export const createOrder = async (req, res) => {
    try {
        const { shippingaddress } = req.body; //

        const cartItems = await cart.findOne({ UserId: req.user.id });

        if (!cartItems || cartItems.item.length === 0) {
            return res.status(400).json({ message: "Cart is empty", success: false });
        }

        const orderItems = cartItems.item.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            name:item.name
        }));

        const totalprice = cartItems.item.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const orderData = {
            UserId: req.user.id,
            items: orderItems,
            totalAmount: totalprice,
            orderStatus: "processing",
            paymentStatus: "pending",
            shippingaddress
        };

        const order = await Order.create(orderData);

        // Reduce stock for each product
        for (const item of orderItems) {
            await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
        }

        cartItems.item = [];          
        cartItems.totalAmount = 0;    
        await cartItems.save(); 
             

        return res.status(200).json({ message: "Order created successfully", success: true, order });

    } catch (error) {
        return res.status(500).json({ message: "Server error", success: false, error: error.message }); // readable error
    }
};
export const getOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found", success: false });
        }
        if (order.UserId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized access", success: false });
        }
        return res.status(200).json({ message: "Order fetched successfully", success: true, order });


    } catch (error) {
        return res.status(500).json({
            message: "server error",
            success: false,
            error: error


        })
    }
    
    
}
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ UserId: req.user.id }).sort({ createdAt: -1 });
        if (!orders || orders.length === 0) {
    return res.status(404).json({ message: "No orders found", success: false });
}
        return res.status(200).json({
            message: "Order fetched sucessfully",
            success: true,
            orders
        })

    } catch (error) {
        return res.status(500).json({
            message: "server error",
            error: error,
            success: false


        })
        
    }
    
    
    
}
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus, paymentStatus } = req.body;

        const updateData = {};
        if (orderStatus) updateData.orderStatus = orderStatus;
        if (paymentStatus) updateData.paymentStatus = paymentStatus;

        const order = await Order.findByIdAndUpdate(id, updateData, { new: true });
        if (!order) {
            return res.status(404).json({ message: "Order not found", success: false });
        }

        return res.status(200).json({ message: "Order updated successfully", success: true, order });
    } catch (error) {
        return res.status(500).json({ message: "Server error", success: false, error: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('UserId', 'fullname email').sort({ createdAt: -1 });
        return res.status(200).json({ message: "All orders fetched", success: true, orders });
    } catch (error) {
        return res.status(500).json({ message: "Server error", success: false, error: error.message });
    }
};
