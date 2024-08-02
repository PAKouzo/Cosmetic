import ProductModel from "../models/products.js";
const ProductMDW = {
    checkcreate: async(req, res, next) => {
        try {
            const { name, type, price, countInStock, rating, description } = req.body;
            const product = await ProductModel.findOne({ name });
            if (product) throw new Error("Sản phẩm tên trùng nhau");
            if (!name || !type || !price || !countInStock || !rating || !description)
                throw new Error("The input is required!");
            next();
            } catch (e) {
            res.status(400).send({
                message: e.message,
                status: "Failed!",
            });
            }
    }
};
export default ProductMDW;