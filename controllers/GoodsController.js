import GoodsModel from '../models/Goods.js'


export const getAll = async (req, res) => {
    try {
        const goods = await GoodsModel.find().populate('user').exec();
        res.json(goods);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить товари',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const goodsId = req.params.id;

        GoodsModel.findOneAndUpdate(
            {
                _id: goodsId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось вернуть товар',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Товар не найден',
                    });
                }
                res.json(doc);
            },
        ).populate('user');
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить товари',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const goodsId = req.params.id;

        GoodsModel.findOneAndDelete(
            {
                _id: goodsId,
            },
            (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Не удалось удалить товар',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Товар не найден',
                    });
                }

                res.json({
                    success: true,
                });
            },
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить товари',
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new GoodsModel({
            name: req.body.name,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        });

        const goods = await doc.save();

        res.json(goods);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать товар',
        });
    }
};

export const update = async (req, res) => {
    try {
        const goodsId = req.params.id;

        await GoodsModel.updateOne(
            {
                _id: goodsId,
            },
            {
                name: req.body.name,
                price: req.body.price,
                imageUrl: req.body.imageUrl,
                user: req.userId,
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить товар',
        });
    }
};