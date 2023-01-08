const sortGood = require('../helpers/sort');
const Category = require('../models/category');
const Good = require('../models/good');
const Image = require('../models/image');
const { handleError } = require('../helpers/handleError');


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
            handleError(res, error)
        });

    const goods = await Good
        .find({}, { description: 0, price: 0 }).populate('category').exec()
        .then(good => {
            return good
        })
        .catch((error) => {
            handleError(res, error)
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
            handleError(res, error)
        });
    res.status(200).json({ category, goods, image })

}

const getGoods = async (req, res) => {
    const catName = req.params.id
    let sortValue = {}
    req.query.s ? sortValue = sortGood(req.query.s) : sortValue = { name: 1 }
    let pageQuery = parseInt(req.query?.page)
    // console.log('pageQuery', pageQuery);
    pageQuery === 0 ? pageQuery = 1 : pageQuery
    let page = parseInt(pageQuery) - 1 || 0;
    let limit = parseInt(req.query?.limit) || 3;
    // console.log('limit', limit);
    // console.log('page', page);
    let skip = page * limit
    // console.log('skip', skip);


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
        .catch((error) => {
            handleError(res, error)
        });
    const total = await Good
        .countDocuments({ category: cat?._id || '' })
        .catch(error => handleError(res, error))
    console.log('total', total);
    res.status(200).json({
        goods,
        total
    })

}
const getGood = async (req, res) => {
    const Id = req.query.id
    const good = await Good
        .findById(Id)
        .then(data => {
            return data
        })
        .catch((error) => {
            handleError(res, error)
        });
    const images = await Image
        .find({ goodId: { $eq: Id } }, { _id: 0 })
        .then(image => {
            return image.map(item => item.image)
        }
        )
        .catch((error) => {
            handleError(res, error)
        });
    res.status(200).json({ good, images })
}

const searchGood = async (req, res) => {
    const searchValue = req.query.q
    let sortValue = {}
    req.query.s ? sortValue = sortGood(req.query.s) : sortValue = { name: 1 }
    let pageQuery = parseInt(req.query?.page)
    // console.log('pageQuery', pageQuery);
    pageQuery === 0 ? pageQuery = 1 : pageQuery
    let page = parseInt(pageQuery) - 1 || 0;
    let limit = parseInt(req.query?.limit) || 3;
    // console.log('limit', limit);
    // console.log('page', page);
    let skip = page * limit
    // console.log('skip', skip);

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
        .catch((error) => {
            handleError(res, error)
        });
    const total = await Good
        .countDocuments({ name: { '$regex': searchValue, '$options': 'im' } })
        .catch(error => handleError(res, error))

    res.status(200).json({ goods, total })
}

module.exports = {
    getCategory,
    getGoods,
    getGood,
    searchGood,
}