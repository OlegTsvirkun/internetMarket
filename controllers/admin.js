
const path = require('path');
const fs = require('fs');
const Category = require('../models/category');
const Good = require('../models/good');
const Image = require('../models/image');
const ApiErrors = require('../helpers/ApiErrors');
const { filenameMaker } = require('../helpers/filenameMaker');


const createCategory = async (req, res, next) => {
    try {
        const { category, description } = req.body
        const { picture } = req.files
        if (!category) next(ApiErrors.badRequest({message:'Не вказана категорія'}))
        if (!description) next(ApiErrors.badRequest({message:'Не вказан опис'}))
        if (!picture) next(ApiErrors.badRequest({message:'Не вказано зображення'}))
        await Category.findOne({ category: category }).then(data => {
            if (data) return next(ApiErrors.badRequest({message:'Така категорія вже існує'}))
        })
        const cat = await Category
            .create({
                category: category,
                description: description
            })
            .then(data => data)
        const catPic = await Image
            .create({
                image: filenameMaker(picture, category),
                goodId: cat._id
            })
            .then(data => {
                picture.mv(path.resolve(__dirname, '..', 'images', data.image))
                return data
            })
        res.json({ response: `Категорія ${cat.category} додана` })
    } catch (error) {
        next(ApiErrors.internal(
            error.message
        ))

    }
}
const createGood = async (req, res, next) => {
    try {
        const { name, articul, price, category, description } = req.body
        if (!name) next(ApiErrors.badRequest({message:'Не вказана назва'}))
        if (!articul) next(ApiErrors.badRequest({message:'Не вказан артикул'}))
        if (!price) next(ApiErrors.badRequest({message:'Не вказана ціна'}))
        if (!category) next(ApiErrors.badRequest({message:'Не вказана категорія'}))
        if (!description) next(ApiErrors.badRequest({message:'Не вказан опис'}))

        await Good.findOne({ name: name }).then(data => {
            console.log(data, "name");
            if (data) return next(ApiErrors.badRequest({message:'Товар з такою назвою вже існує'}))
        })
        await Good.findOne({ articul: articul }).then(data => {
            console.log(data, "art");
            if (data) return next(ApiErrors.badRequest({message:'Товар з таким артикулом вже існує'}))
        })
        const picture = req.files?.picture || {}
        if (!picture.name) return next(ApiErrors.badRequest({ message: 'Немає основного зображення' }))
        let picName = filenameMaker(picture, category, name)
        let images = Object.keys(req.files).reduce((acc, item) => {
            if (item != 'picture') {
                acc.push(req.files[item])
            }
            return acc
        }, [])

        const cat = await Category
            .find({
                category: category
            }).then(data => {
                return data[0]
            })
            .catch(err => { if (err) throw err })

        const good = await Good
            .create({
                name: name,
                articul: articul,
                description: description,
                price: price,
                category: cat._id,
                picture: picName,
            })
            .then(data => {

                return data
            }
            )

        const goodPic = await Image
            .create({
                image: picName,
                goodId: good._id
            })
            .then(data => {
                picture.mv(path.resolve(__dirname, '..', 'images', data.image))

                return data
            }
            )
        if (images.length > 0) {
            const goodImages = await Promise.all(images.map(async item => {
                const goodImage = Image
                    .create({
                        image: filenameMaker(item, category, name),
                        goodId: good._id
                    }).then(data => {
                        item.mv(path.resolve(__dirname, '..', 'images', data.image))

                        return data
                    })
                return goodImage
            }))
        }
        res.json({ response: `Товар ${good.name} додано` })


    } catch (error) {
        if (error) {

        }
        next(ApiErrors.badRequest(error.message))
    }
}
const updateGood = async (req, res, next) => {
    try {
        const { id } = req.body
        const picture = req.files?.picture || {}

        //!
        const goodDB = await Good
            .findById(id)
            .populate('category', { description: 0, _id: 0 })
            .then(data => data)

        let category
        let name
        req.body?.category != undefined
            ? category = req.body.category
            : category = goodDB.category.category
        req.body?.name != undefined
            ? name = req.body.name
            : name = goodDB.name

        const catId = await Category.find({ category: category })
            .then(data => data[0]._id)
        const filter = Object.keys(req.body).reduce((acc, item) => {
            if (item != 'id') acc[item] = req.body[item]
            return acc
        }, {})
        filter.category = catId
        if (picture?.name) filter.picture = filenameMaker(picture, category, name)
        let images = Object.keys(req.files || {}).reduce((acc, item) => {
            if (item != 'picture') {
                acc.push(req?.files[item])
            }
            return acc
        }, [])

        const good = await Good
            .findByIdAndUpdate({ _id: id }, {...filter})
            .then(data =>{ 
                return data})
            .catch(err => console.log('good:', err))
            console.log('good.picture:', good.picture);
            console.log('filter.picture:', filter.picture);
        if (picture?.name) {

            const goodPic = await Image
                .create({
                    image: filter.picture,
                    goodId: id
                })
                .then(data => {
                    picture.mv(path.resolve(__dirname, '..', 'images', data.image))

                    return data
                }
                )
                .catch(err => console.log('goodPic:', err))
        }

        if (images.length > 0) {
            const goodImages = await Promise.all(images.map(async item => {
                const goodImage = Image
                    .create({
                        image: filenameMaker(item, category, name),
                        goodId: id
                    }).then(data => {
                        item.mv(path.resolve(__dirname, '..', 'images', data.image))
                        
                        return data
                    })
                    .catch(err => console.log('goodImages:', err))
                return goodImage
            }))
        }
        res.json({ response: `Товар ${good.name} оновлено. Оневлені поля: ${Object.keys(filter).map(item => item)}` })
    } catch (error) {
        next(ApiErrors.badRequest(error.message))
    }
}
const removeImage = async (req, res, next) => {
    try {
        const { image } = req.body
        const im = await Image
            .findOneAndDelete({ image: { $eq: image } })
            .then(data => data)
        const imageFile = path.resolve(__dirname,'..','images',im.image)
        fs.unlink(imageFile,(err)=>{
            if(err) return console.log(err);
        })
        res.json({ 
            response:
             `Зображення ${im.image} видалено` || 'Deleted' 
            })

    } catch (error) {
        next(ApiErrors.badRequest(error.message))
    }
}
const removeGood = async (req, res, next) => {
    try {
        const { id } = req.body
        const good = await Good

            // .findById(id)
            //!
            .findByIdAndDelete(id)  
            .then(data => data)
            const images = await Image
            .find({goodId: id})
            .then(data=>{
                data.forEach(img=>{
                    let imageFile = path.resolve(__dirname,'..','images',img.image)
                    fs.unlink(imageFile,(err)=>{
                        if(err) return console.log(err);
                    })
                    })
            })
        res.json({ response: `Товар ${good.name} видалено`  })

    } catch (error) {
        next(ApiErrors.badRequest(error.message))
    }
}


module.exports = {
    createCategory,
    createGood,
    updateGood,
    removeImage,
    removeGood
}