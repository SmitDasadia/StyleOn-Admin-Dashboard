import Admin from "../../../models/Admin"
import connectDb from "../../../middleware/mongoose"
var CryptoJS = require("crypto-js")

const handler = async (req, res) => {
    if (req.method == 'POST') {
        
        const {name, email} =  req.body
        let u = new Admin({name, email, password: CryptoJS.AES.encrypt(req.body.password,process.env.NEXT_PUBLIC_ADMINEN_KEY).toString()
    })
        await u.save()
        res.status(200).json({ success: "New Admin Add To database." })

    } else {
        res.status(400).json({ error: "This method is not allowed." })
    }


}

export default connectDb(handler)