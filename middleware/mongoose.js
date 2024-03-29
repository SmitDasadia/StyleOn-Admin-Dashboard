const mongoose = require('mongoose');

const connectDb = handler => async (req, res) => {

    try {
        if (mongoose.connections[0].readyState) {
            return handler(req, res)
        }
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4,
        })
        // await mongoose.connect(process.env.MONGO_URI)
        return handler(req, res)

    } catch (error) {
        return error
    }

}
export default connectDb;