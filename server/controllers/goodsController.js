const sortGood = require('../helpers/sort');
const Category = require('../models/category');
const Good = require('../models/good');
const Image = require('../models/image');
const ApiErrors = require('../helpers/ApiErrors');

const getCategory = async (req, res, next) => {
    try {
        const category = await Category
            .find({}, { description: 0 })
            .then(categories => {
                return categories.reduce((acc, item) => {
                    acc[item['_id']] = item.category
                    return acc
                }, {})
            })

        const goods = await Good
            .find({}, { description: 0, price: 0 }).populate('category').exec()
            .then(good => {
                return good
            })


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

        return res.status(200).json({ category, goods, image })
    } catch (error) {
        next(ApiErrors.badRequest(error.message))
    }

}

const getGoods = async (req, res, next) => {
    try {
        const catName = req.params.id
        if (!catName) {
            return next(ApiErrors.badRequest({ message: 'Не завдана категорія товару' }))
        }
        let sortValue = {}
        req.query.s ? sortValue = sortGood(req.query.s) : sortValue = { name: 1 }
        let pageQuery = parseInt(req.query?.page)
        pageQuery === 0 ? pageQuery = 1 : pageQuery
        let page = parseInt(pageQuery) - 1 || 0;
        let limit = parseInt(req.query?.limit) || 3;
        let skip = page * limit


        const cat = await Category
            .findOne({ category: catName })
        const goods = await Good
            .find({ category: cat?._id || '' },
            )
            .populate({
                path: 'category',
                match: {
                    category: catName,
                }
            })
            .sort(sortValue)
            .skip(skip)
            .limit(limit)
            .exec()

        const total = await Good
            .countDocuments({ category: cat?._id || '' })

        return res.status(200).json({
            goods,
            total,
            catDescription: cat?.description || '',
            curPage: pageQuery || 1
        })
    } catch (error) {
        next(ApiErrors.badRequest({ message: 'Помилка: такої категоріі товару немає' }))

    }



}
const getGood = async (req, res, next) => {
    try {
        const Id = req.query?.id || ''
        const articul = req.query?.articul || ''
        let good = {}
        if (Id && !articul) {
            good = await Good
                .findById(Id)
                .populate('category', { _id: 0, description: 0 })
                .then(data => {
                    return data
                })

        }
        else if (!Id && articul) {
            good = await Good
                .findOne({ articul: articul })
                .then(data => {
                    return data
                }).catch(err => { return res.status(400).json({ message: err }) })

        }

        const images = await Image
            .find({ goodId: good._id }, { _id: 0 })
            .then(image => {
                return image.map(item => item.image)
            }
            ).catch(err => { return res.status(400).json({ message: err }) })
        res.status(200).json({ good, images })
    } catch (error) {
        console.log(error);
        return next(ApiErrors.badRequest({ message: 'Помилка: такого товару немає' }))

    }


}

const searchGood = async (req, res, next) => {
    try {
        const searchValue = req.query.q
        if (!searchValue) {
            return next(ApiErrors.badRequest({ message: 'Введіть запрос у пошук' }))

        }
        let sortValue = {}

        req.query.s ? sortValue = sortGood(req.query.s) : sortValue = { name: 1 }
        let pageQuery = parseInt(req.query?.page)
        pageQuery === 0 ? pageQuery = 1 : pageQuery
        let page = parseInt(pageQuery) - 1 || 0;
        let limit = parseInt(req.query?.limit) || 3;
        let skip = page * limit

        const total = await Good
            .countDocuments({ name: { '$regex': searchValue, '$options': 'im' } })
        if (!total) {
            return next(ApiErrors.notFound({ message: 'Товари з таким запитом відсутні' }))

        }
        const goods = await Good
            .find({ name: { '$regex': searchValue, '$options': 'im' } })
            .sort(sortValue)
            .skip(skip)
            .limit(limit)
            .exec()
            .then(data => {
                return data
            }
            )


        res.status(200).json({ goods, total })
    } catch (error) {
        console.log(error.message);
        next(ApiErrors.badRequest(error.message))

    }


}

const searchGoodByArticul = async (req, res, next) => {
    try {
        let articul = req.query?.articul || ''
        if (!articul) return next(ApiErrors.badRequest({ message: 'Введіть артикул' }))
        const goods = await Good
            .find({ articul: articul })
            .then(data => {

                return data
            })
        if (goods.length == 0)
            return next(ApiErrors.badRequest({ message: 'Немає товару за таким запитом' }))
        res.json({ goods })
    } catch (error) {
        console.log('error:', error.message);
        return next(ApiErrors.internal(error))
    }

}

module.exports = {
    getCategory,
    getGoods,
    getGood,
    searchGood,
    searchGoodByArticul

}