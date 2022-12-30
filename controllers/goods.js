
const Category = require('../models/category');
const Good = require('../models/good');
const Image = require('../models/image');
const handleError = (res, error) => {
    console.log(error);
    res.status(500).json({ 'Error:': error })
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
            handleError(res, error)
        });
    res.status(200).json({ goods })

}
const getGood = async (req, res) => {
    const Id = req.query.id
    // console.log(req.query);
    const good = await Good
        .findById(Id)
        .then(data =>{
            // let newData = {}
            // newData[data['articul']] =data
            // console.log(newData);
            //  return newData
             return data
            }
            // .reduce((acc, item) => {
            //     acc[item['articul']] = item
            //     return acc
            // }, {})
            )
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
        // console.log(good);
    res.status(200).json({ good, images })
}

const searchGood = async (req, res) => {
    const searchValue = req.query.q
    console.log(req.query);
  let searchArr = searchValue.split(" ")
    const goods = await Good
    .find({name:{'$regex' : searchValue, '$options' : 'im'}})
        .then(data =>{
             return data
             .reduce((acc, item) => {
                acc[item['articul']] = item
                return acc
            }, {})
            }
            )
        .catch((error) => {
            handleError(res, error)
        });
   console.log(goods);
   res.status(200).json({ goods })
} 

module.exports = {
    getCategory,
    getGoods,
    getGood,
    searchGood
}