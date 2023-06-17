import Product from "../../../models/Product"
import connectDb from "../../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        const formData = req.body;
        
        const {title, slug, desc, img, category, color, size, price, avialableQty} =  formData
        let u = new Product({title, slug, desc, img, category, color, size, price, avialableQty
    })
        await u.save()
        res.status(200).json({ success: "New Product Add To database." })

    } else {
        res.status(400).json({ error: "This method is not allowed." })
    }



}

export default connectDb(handler)