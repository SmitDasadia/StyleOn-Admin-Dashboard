import Product from "../../../models/Product"
import connectDb from "../../../middleware/mongoose"



const handler = async (req, res) => {
    // Ensure that the method is DELETE
    if (req.method !== 'DELETE') {
        res.status(400).json({ message: 'Invalid request method' });
        return;
    }

    // Extract the product ID from the request body or query parameters
    const productId = req.body.productId || req.query.productId;

    try {

        // Find the product by ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }


}

export default connectDb(handler)