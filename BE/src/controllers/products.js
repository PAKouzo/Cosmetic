import ProductModel from "../models/products.js";
import UserModel from "../models/users.js";


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
          const productData = await ProductModel.find();
          if(!productData) {
              return res.status(404).json({
                  message: "Product data not found."
              });
          }
          res.status(200).json({
              productData
          });
      } catch (e) {
          res.status(404).json({
              message: e
          });
      }
    },
    addToWishlist: async (req, res) => {
        try {
          const { userID } = req.params;
          const { productID } = req.body;
    
          // Kiểm tra xem sản phẩm có tồn tại không
          const products = await ProductModel.findById(productID);
          if (!products) {
            return res.status(404).json({
              message: "Sản phẩm không tồn tại.",
            });
          }
    
          // Kiểm tra xem người dùng có tồn tại không
          const user = await UserModel.findById(userID);
          if (!user) {
            return res.status(404).json({
              message: "Người dùng không tồn tại.",
            });
          }
    
          // Thêm sản phẩm vào danh sách yêu thích của người dùng nếu chưa có
          if (!user.wishlist.includes(productID)) { //Hàm includes kiểm tra xem giá trị có tồn tại trong mảng hay không
            user.wishlist.push(productID); //Hàm push thêm phần tử vào mảng
            await user.save(); //Hàm save lưu các thay đổi vào CSDL
          }
    
          res.status(200).json({
            message: "Sản phẩm đã được thêm vào danh sách yêu thích.",
            userID,
            wishlist: user.wishlist,
          });
        } catch (e) {
          res.status(400).json({
            message: e
          });
        }
      },
      rating: async(req, res) => {
        try {
            const { productID } = req.params;
            const { star, comment, postedby } = req.body;
      
            // Tìm sản phẩm theo ID
            const product = await ProductModel.findById(productID);
            if (!product) {
              return res.status(404).json({
                message: "Product not found.",
              });
            }
      
            // Kiểm tra xem người dùng có tồn tại không
            const user = await UserModel.findById(postedby);
            if (!user) {
              return res.status(404).json({
                message: "User not found.",
              });
            }
      
            // Thêm đánh giá vào sản phẩm
            product.ratings.push({ star, comment, postedby });
            await product.save();
      
            res.status(200).json({
              message: "Rating added successfully.",
              data: product,
            });
          } catch (error) {
            res.status(400).json({
              message: error.message,
            });
          }
        },
};
export default ProductCTL;