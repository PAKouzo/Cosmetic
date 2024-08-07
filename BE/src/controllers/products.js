const ProductCTL = {
    create: async (req, res) => {
        try {
          const { name, image, type, price, countInStock, description } = req.body;
          const product = await ProductModel.create({
            name,
            image,
            type,
            price,
            countInStock,
            description,
          });
          res.status(200).send({
            message: "Create successfully!",
            data: product,
          });
        } catch (e) {
          return res.status(404).json({
            message: e,
          });
        }
    }
}