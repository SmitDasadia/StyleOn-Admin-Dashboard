import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'PUT') {
        for (let i = 0; i < req.body.length; i++) {
            let p = await Product.findByIdAndUpdate(req.body[0]._id, req.body[i])
                
            await p.save()
        }
        res.status(200).json({ success: "Your Product Add To database."})

    } else {
        res.status(400).json({ error: "This method is not allowed." })
    }


}

export default connectDb(handler)