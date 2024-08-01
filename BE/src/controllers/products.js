import ProductModel from "../models/products.js";


const ProductCTL = {
    create: async(req, res)=>{
        try {
          const { name, image, type, price, countInStock, rating, description } = req.body 
          const product = await ProductModel.create({
            name, 
            image, 
            type, 
            price, 
            countInStock, 
            rating, 
            description
          });
          res.status(200).send({
            message: "Register successfully!",
            data: product
          })
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }},
};
export default ProductCTL;