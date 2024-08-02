import ProductModel from "../models/products.js";


const ProductCTL = {
    create: async(req, res)=>{
        try {
          const { name, type, price, countInStock, description } = req.body 
          const product = await ProductModel.create({
            name, 
            type, 
            price, 
            countInStock, 
            description
          });
          res.status(200).send({
            message: "Create successfully!",
            data: product
          })
        } catch (e) {
            return res.status(404).json({
                message: e
            })
        }
      },
      updateProduct: async (req, res) => {
        try {
            const { productID } = req.params; 
            const { price, countInStock, description } = req.body;
            
            const updatedProduct = await ProductModel.findByIdAndUpdate(productID, {
              price, 
              countInStock, 
              description
            }, { new: true });
            
            if (!updatedProduct) {
                return res.status(404).json({
                    message: 'Product not found',
                    status: 'Failed',
                });
            }
            
            res.status(200).send({
                message: 'Update product successfully',
                data: updatedProduct
            });
        } catch (e) {
            return res.status(400).json({
                message: e.message,
                status: 'Failed',
            });
        }
    },
    deleteProduct: async (req, res) => {
      try {
          const { productID } = req.params;
          const productExist = await ProductModel.findById(productID);
          if (!productExist) {
              return res.status(404).json({ 
                  message: "Product not found." 
              });
          }
          await ProductModel.findByIdAndDelete(productID);
          res.status(200).json({ 
              message: "Product deleted successfully." 
          });
          } catch (e) {
              res.status(404).json({ 
                  message: e
          });
          }
    },
    getProductByID: async (req, res) => {
      try {
          const { productID, name, type } = req.query; //Dùng query thường dùng để tìm kiếm và lọc toàn bộ dữ liệu. Còn params thì tìm kiếm cụ thể
          let productExist;

          if (productID) {
            productExist = await ProductModel.findById(productID);
          } else if (name) {
            productExist = await ProductModel.findOne({ name });
          } else if (type) {
            productExist = await ProductModel.findOne({ type });
          };

          if(!productExist) {
              return res.status(404).json({
                  message: "Product not found."
              });
          }
          res.status(200).json({
              productExist
          });
      } catch (e) {
          res.status(404).json({
              message: e
          });
      }
    },
    getAllProduct: async (req, res) => {
      try {
          const userData = await UserModel.find();
          if(!userData) {
              return res.status(404).json({
                  message: "User data not found."
              });
          }
          res.status(200).json({
              userData
          });
      } catch (e) {
          res.status(404).json({
              message: e
          });
      }
    }
};
export default ProductCTL;