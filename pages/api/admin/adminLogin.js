import Admin from "../../../models/Admin"
import connectDb from "../../../middleware/mongoose"
var CryptoJS = require("crypto-js")
var jwt = require('jsonwebtoken');



const handler = async (req, res) => {
    if (req.method == 'POST') {
        let admin = await Admin.findOne({ "email": req.body.email })
        const bytes = CryptoJS.AES.decrypt(admin.password, process.env.NEXT_PUBLIC_adminEN_KEY );
        let decyptedpassword = bytes.toString(CryptoJS.enc.Utf8);
        if (admin) {
            if (req.body.email == admin.email && req.body.password == decyptedpassword) {
                var token = jwt.sign({ email: admin.email, name: admin.name}, process.env.NEXT_PUBLIC_JWT_SECRAT, { expiresIn: '2h' });
                res.status(200).json({ success: true, token })
            } else {
                res.status(400).json({ error: "Invalid Credentials" })
            }

           


        } 
         else {
            res.status(400).json({ error: "Invalid Credentials" })
        }

    } else {
        res.status(400).json({ error: "error" })
    }


}

export default connectDb(handler)
