const CartModel = require('../models/cartItemSchema.')
const ProductModel = require('../models/productSchema');

const addToCart = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const existingCartItem = await CartModel.findOne({ product, userId: req.token.userId });

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            const populatedCartItem = await CartModel.populate(existingCartItem, { path: 'product' });

            return res.status(200).json({
                success: true,
                message: "Quantity updated successfully",
                cartItem: populatedCartItem
            });
        }

        const newCartItem = new CartModel({
            product,
            quantity,
            userId: req.token.userId
        });

        const savedCartItem = await newCartItem.save();
        const populatedCartItem = await CartModel.populate(savedCartItem, { path: 'product' });

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            cartItem: populatedCartItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding product",
            error: error.message
        });
    }
}

const getAllCart = (req, res) => {
    // console.log(req.token);
    CartModel.find({ userId: req.token.userId })
        .populate('product')
        .then((result) => {
            res.status(200).json({
                success: true,
                message: "All the carts",
                cartItem: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server error",
                error: err.message
            });
        });
}
const removeProductFromCart = (req, res) => {
    console.log(req.token.userId)
    const userId = req.token.userId; 
    const productId = req.params.productId; 
    CartModel.deleteOne({ product: productId })
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found in the user's cart",
                });
            }
            res.status(200).json({
                success: true,
                message: "Product removed successfully from the user's cart",
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: "Server error",
                err: err
            });
        });
};

module.exports = {
    addToCart,
    getAllCart,
    removeProductFromCart
}