import OrderModel from '../models/Order.js'


export const getAll = async (req, res) => {
    const query = {
        user: req.user._id
    }
    if (req.query.start) {
        query.date = {
            $gte: req.query.start
        }
    }

    if (req.query.end) {
        if (!query.date) {
            query.date = {}
        }

        query.date['$lte'] = req.query.end
    }

    if (req.query.order) {
        query.order = +req.query.order
    }
    try {
        const orders = await OrderModel
            .find(query)
            .sort({ date: -1 })
            .skip(+req.query.offset)
            .limit(+req.query.limit)

        res.status(200).json(orders)

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить закази',
        });
    }
};

export const create = async (req, res) => {
    try {
        
        const lastOrder = await OrderModel
            .findOne({ user: req.user})
            .sort({ date: -1 })

        const maxOrder = lastOrder ? lastOrder.order : 0

        const doc = new OrderModel({
            list: req.body.list,
            user: req.user,
            order: maxOrder + 1
        });

        const order = await doc.save();
        console.log(req.user)

        res.json(order)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать заказ',
        });
    }
};