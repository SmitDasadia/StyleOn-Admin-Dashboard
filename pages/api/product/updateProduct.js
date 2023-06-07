import Product from "../../../models/Product"
import connectDb from "../../../middleware/mongoose"



const handler = async (req, res) => {


  if (req.method !== 'PUT') {
    res.status(400).json({ message: 'Invalid request method' });
    return;
  } else {
    try {
      const formData = req.body;
      const { productId } = req.query;

      if (formData && productId) {
        const { title, slug, desc, img, category, color, size, price, avialableQty } = formData;
        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          { title, slug, desc, img, category, color, size, price, avialableQty },
          { new: true }
        );
        if (updatedProduct) {
          res.status(200).json({ success: "Product Updated." });
        } else {
          res.status(404).json({ error: "Product Not Found." });
        }
      } else {
        res.status(400).json({ error: "Product Not Updated. Request body or productId is missing." });
      }
    } catch (error) {
      res.status(500).json({ error: "An error occurred.", errorMessage: error.message });
    }
  }



}

export default connectDb(handler)