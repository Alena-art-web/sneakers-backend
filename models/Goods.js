import mongoose from 'mongoose'

const GoodsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: Number,
        imageUrl: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Goods', GoodsSchema)