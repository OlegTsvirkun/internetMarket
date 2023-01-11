const path = require('path');
const sortGood = require('../helpers/sort');
const Category = require('../models/category');
const Good = require('../models/good');
const Image = require('../models/image');
const { handleError } = require('../helpers/handleError');
const ApiErrors = require('../helpers/ApiErrors');
const { filenameMaker } = require('../helpers/filenameMaker');

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
        // handleError(res, error) //!
    }

}

const getGoods = async (req, res, next) => {
    try {
        const catName = req.params.id
        if (!catName) {
            return next(ApiErrors.badRequest('Не завдана категорія товару'))
        }
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

        const total = await Good
            .countDocuments({ category: cat?._id || '' })
        console.log('catDesc', cat?.description);

        return res.status(200).json({
            goods,
            total,
            catDescription: cat?.description || ''
        })
    } catch (error) {
        next(ApiErrors.badRequest(error.message))

    }



}
const getGood = async (req, res, next) => {
    try {
        const Id = req.query.id
        if (!Id) {
            return next(ApiErrors.badRequest('Не завдан id товару'))
        }
        const good = await Good
            .findById(Id)
            .then(data => {
                return data
            })

        const images = await Image
            .find({ goodId: { $eq: Id } }, { _id: 0 })
            .then(image => {
                return image.map(item => item.image)
            }
            )

        res.status(200).json({ good, images })
    } catch (error) {
        console.log(error.message);
        next(ApiErrors.badRequest(error.message))

    }


}

const searchGood = async (req, res, next) => {
    try {
        const searchValue = req.query.q
        if (!searchValue) {
            return next(ApiErrors.badRequest('Введіть запрос у пошук'))

        }
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

        const total = await Good
            .countDocuments({ name: { '$regex': searchValue, '$options': 'im' } })
        if (!total) {
            return next(ApiErrors.notFound('Товари з таким запитом відсутні'))

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

const createGood = async (req, res, next) => {
    try {
        const { category, catDescription, name, articul, description, price } = req.body
        const { catPicture,picture, images } = req.files
        // let picExt =picture.name.split('.').slice(-1),
        let picName = filenameMaker(picture,category,name)

        // let fileName = category + '-' + name + '-' + Date.now() + picExt
        // console.log('picExt',picExt);
        // console.log('fileName', filenameMaker(picture,category,name));
        console.log(
            // req.body,
            // picExt
            // category, name, articul,description,price,picture, pictures
        );

        const cat = await Category
        .create({
            category: category,
            description:catDescription
        })
        .then(data=>data)
const catPic = await Image
.create({
    image:filenameMaker(catPicture,category,name),
    goodId:cat._id
})
.then(data=>data)
        // const good = await Good
        // .create({
        //     name: name,
        //     articul:articul,
        //     description:description,
        //     price:price,
        //     category: cat._id,
        //     picture:picName,
        //             })
        res.json({
            cat,
            catPic
        })

    } catch (error) {
        next(ApiErrors.badRequest(error.message))

    }
}

module.exports = {
    getCategory,
    getGoods,
    getGood,
    searchGood,
    createGood
}