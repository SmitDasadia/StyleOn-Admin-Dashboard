
import connectDb from "../../../middleware/mongoose"
import { addProduct, deleteProduct, getProduct, updateProduct } from "../../../controller/Controller";

const handler = async (req, res) => {


    const { method } = req;

    switch (method) {
        case 'GET':
            getProduct(req,res)
            break;
        case 'POST':
            addProduct(req,res)
            break;
        case 'PUT':
            updateProduct(req,res)
            break;
        case 'DELETE':
            deleteProduct(req,res)
            break;
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).json(`Method ${method} Not Allowded`);
            break;
    }



}

export default connectDb(handler)