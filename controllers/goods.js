
const Category = require('../models/category');
const Good = require('../models/good');
const Image = require('../models/image');
const handleError = (error)=>{
    console.log(error);
    res.status(500).json({'Error:': error})
}

const getCategory = async (req, res) => {

    const category = await Category
        .find({}, { description: 0 })
        .then(categories => {
            return categories.reduce((acc, item) => {
                acc[item['_id']] = item.category
                return acc
            }, {})
        })
        .catch((error) => {
            handleError(error)
        });

    const goods = await Good
        .find({}, { description: 0, price: 0 }).populate('category').exec()
        .then(good => {
            return good

        })
        .catch((error) => {
            handleError(error)
        });
    const catId = Object.keys(category).map(item => item)
    const image = await Image
        .find({ goodId: { $in: catId } }, { _id: 0 })
        .then(images => {
            return images.reduce((acc, item) => {
                acc[item['goodId']] = item.image
                return acc
            }, {})
        }
        )
        .catch((error) => {
            handleError(error)
        });

    res.status(200).json({ category, goods, image })

}

const getGoods = async (req, res) => {
    const catName = req.params.id
    const goods = await Good
        .find()
        .populate({
            path: 'category',
            match: {
                category: { $eq: catName },

            }
        })
        .exec()
        .then(good => {

            return good
                .filter(item => item.category)
                .reduce((acc, item) => {
                    acc[item['articul']] = item
                    return acc
                }, {})
        })
        .catch((error) => {
            handleError(error)
        });
    res.status(200).json({ goods })

}


module.exports = {
    getCategory,
    getGoods
}