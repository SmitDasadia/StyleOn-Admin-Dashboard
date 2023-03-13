import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js")
var jwt = require('jsonwebtoken');



const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user = await User.findOne({ "email": req.body.email })
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.NEXT_PUBLIC_EN_KEY );
        let decyptedpassword = bytes.toString(CryptoJS.enc.Utf8);
        if (user) {
            if (req.body.email == user.email && req.body.password == decyptedpassword) {
                var token = jwt.sign({ email: user.email, name: user.name }, process.env.NEXT_PUBLIC_JWT_SECRAT, { expiresIn: '2h' });
                res.status(200).json({ success: true, token })
            } else if(req.body.email == user.email && req.body.password != decyptedpassword) {
                res.status(400).json({ error: "Invalid Credentials" })
            }else if(req.body.email != user.email) {
                res.status(400).json({ error: "Invalid Credentials" })
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
