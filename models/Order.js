import mongoose from 'mongoose'

const OrderShema = new mongoose.Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        order: {
            type: Number,
            required: true
        },
        list: [
            {
                name: {
                    type: String
                },
                quantity: {
                    type: Number
                },
                cost:{
                    type: Number
                }
            }
        ]
        

    }
)

export default mongoose.model('Order', OrderShema)