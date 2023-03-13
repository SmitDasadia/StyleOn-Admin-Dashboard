import mongoose, { connect } from 'mongoose';



const OrderSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    product: [{
        productId: { type: String },
        quantity: { type: String, default: 1 }
    }],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
}, { timestamps: true });

mongoose.models = {}

export default mongoose.model("Order", OrderSchema)