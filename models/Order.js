import mongoose, { connect } from 'mongoose';



const OrderSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    paymentInfo: { type: String, default: ' '},
    product: {type: Object, required: true},
    address: { type: String, required: true },
    pincode: { type: Number, required: true },
    phone: { type: Number, required: true },
    amount: { type: Number, required: true },
    paymentInfo: { type: String, default:"Initated", required: true },
}, { timestamps: true });

mongoose.models = {}

export default mongoose.model("Order", OrderSchema)