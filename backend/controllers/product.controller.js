import Product from "../models/product.model.js";

const ensureAuthorizedProductOwner = async (req, productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        return { product: null, allowed: false };
    }

    const isAdmin = req.user.role === "admin";
    const isOwner = product.userId.toString() === req.user.id;

    return { product, allowed: isAdmin || isOwner };
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, imageUrl } = req.body;

        if (!name || !description || !price || !category || stock === undefined) {
            return res.status(400).json({
                message: "All fields required",
                success: false,
            });
        }

        if (Number(price) < 0 || Number(stock) < 0) {
            return res.status(400).json({
                message: "Price and stock cannot be negative",
                success: false,
            });
        }

        const product = await Product.create({
            name: name.trim(),
            description: description.trim(),
            price: Number(price),
            category: category.trim(),
            stock: Number(stock),
            imageUrl,
            userId: req.user.id,
        });

        return res.status(201).json({
            message: "Product created successfully",
            success: true,
            product,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message,
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const { search = "", category = "", minPrice, maxPrice, sort, page = 1, limit = 10 } = req.query;
        const pageSize = Math.max(1, parseInt(limit) || 10);
        const currentPage = Math.max(1, parseInt(page) || 1);
        const filter = {};

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }
        if (category) {
            filter.category = { $regex: category, $options: "i" };
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        const sortOption = {};
        if (sort === "price_asc") sortOption.price = 1;
        else if (sort === "price_desc") sortOption.price = -1;
        else if (sort === "name_asc") sortOption.name = 1;
        else if (sort === "name_desc") sortOption.name = -1;
        else sortOption.createdAt = -1;

        const total = await Product.countDocuments(filter);
        const totalPages = Math.ceil(total / pageSize);

        const products = await Product.find(filter)
            .sort(sortOption)
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize);

        return res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            products,
            total,
            totalPages,
            currentPage,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message,
        });
    }
};

export const getProductByUserId = async (req, res) => {
    const user = req.user.id;
    try {
        const products = await Product.find({ userId: user });
        return res.status(200).json({
            message: "products fetched for the user ",
            success: true,
            products,
        });
    } catch (error) {
        return res.status(500).json({
            message: "data not fetched for the user",
            success: false,
            error: error.message,
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            product,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, description, price, category, stock, imageUrl } = req.body;
        const authorization = await ensureAuthorizedProductOwner(req, productId);

        if (!authorization.product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }

        if (!authorization.allowed) {
            return res.status(403).json({ message: "You are not allowed to update this product", success: false });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name: name ? name.trim() : authorization.product.name,
                description: description ? description.trim() : authorization.product.description,
                price: price !== undefined ? Number(price) : authorization.product.price,
                category: category ? category.trim() : authorization.product.category,
                stock: stock !== undefined ? Number(stock) : authorization.product.stock,
                imageUrl: imageUrl || authorization.product.imageUrl,
            },
            { new: true }
        );

        return res.status(200).json({
            message: "Product updated successfully",
            success: true,
            product: updatedProduct,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const authorization = await ensureAuthorizedProductOwner(req, productId);

        if (!authorization.product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }

        if (!authorization.allowed) {
            return res.status(403).json({
                message: "You are not allowed to delete this product",
                success: false,
            });
        }

        const deletedProduct = await Product.findByIdAndDelete(productId);
        return res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            product: deletedProduct,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message,
        });
    }
};