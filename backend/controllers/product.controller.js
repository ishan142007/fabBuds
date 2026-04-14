import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
    try {
        const {name, description, price, category, stock, imageUrl} = req.body;
        if(!name || !description || !price || !category || !stock){
            return res.status(400).json({
                message: "All fields required",
                success: false
            })
        }
        const user=req.user.id;
        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            imageUrl,
            userId:user
        });
        return res.status(201).json({
            message: "Product created successfully",
            success: true,
            product
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error
        })
    }
}


export const getAllProducts = async (req, res) => {
    try {
        const { search = "", category = "", minPrice, maxPrice, sort, page = 1, limit = 10 } = req.query;
        const pageSize = parseInt(limit);
        const currentPage = parseInt(page);
        let filter = {};

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

        let sortOption = {};
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
            currentPage
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message
        });
    }
}

export const getProductByUserId=async(req,res)=>{
    const user=req.user.id;
    try {
        const products=await Product.find({userId:user})
        return res.status(200).json({
            message:"products fetched for the user ",
            success:true,
            products
        })
    } catch (error) {
        return res.status(500).json({
            message:"data not fetched for the user",
            success:"false",
            error:error

        })
    }
}


export const getProductById = async (req, res) => {
    try {
        // console.log(req.params.id);
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            product
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const {name, description, price, category, stock, imageUrl} = req.body;
        const productId = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        }, { new: true });
        return res.status(200).json({
            message: "Product updated successfully",
            success: true,
            product: updatedProduct
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
             success: false,
            error: error
        })
    }
        
}

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            product: deletedProduct
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error
        })
    }
}