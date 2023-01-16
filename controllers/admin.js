
const path = require('path');
const sortGood = require('../helpers/sort');
const Category = require('../models/category');
const Good = require('../models/good');
const Image = require('../models/image');
const { handleError } = require('../helpers/handleError');
const ApiErrors = require('../helpers/ApiErrors');
const { filenameMaker } = require('../helpers/filenameMaker');
const { throws } = require('assert');
const { MongooseError } = require('mongoose');
const { findById } = require('../models/orderCounter');


const createCategory = async (req, res, next) => {
    try {
        const { category, description } = req.body
        const { picture } = req.files
        if (!category) next(ApiErrors.badRequest('Не вказана категорія'))
        if (!description) next(ApiErrors.badRequest('Не вказан опис'))
        if (!picture) next(ApiErrors.badRequest('Не вказано зображення'))
        const cat = await Category
            .create({
                category: category,
                description: description
            })
            .then(data => data)
        // .catch(err=>{if(err) throw err})
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
        const picture = req.files?.picture || {}
        if (!picture.name) return next(ApiErrors.badRequest({ error: 'Немає основного зображення' }))
        console.log(picture);
        // let picExt =picture.name.split('.').slice(-1),
        let picName = filenameMaker(picture, category, name)
        let images = Object.keys(req.files).reduce((acc, item) => {
            if (item != 'picture') {
                acc.push(req.files[item])
            }
            return acc
        }, [])
        // let fileName = category + '-' + name + '-' + Date.now() + picExt
        // console.log('picExt',picExt);
        // console.log('fileName', filenameMaker(picture,category,name));
        console.log(
            // req.files
            // 'images',images 
            // picName
            // req.body,
            // picExt
            // category, name, articul,description,price,picture, pictures
        );
        const cat = await Category
            .find({
                category: category
            }).then(data => {
                return data[0]
            })
            .catch(err => { if (err) throw err })
        // console.log(cat.category);

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
        //     console.log(images.map(item=>item.name));
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
        res.json({ message: `Товар ${good.name} додано` })
        // res.json({
        //     cat,
        //     goodPic,
        //     good,
        //     goodPic,
        //     goodImages
        // })
        // res.json({name, articul, price , category,  description })

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


        const goodDB = await Good
            .findById(id)
            .populate('category', { description: 0, _id: 0 })
            .then(data => data)
            console.log(goodDB.category.category);
            console.log(req.body?.name);

        let category
        let name
        req.body?.category!=undefined  ? category = req.body.category : category = goodDB.category.category
        req.body?.name!=undefined ? name = req.body.name : name = goodDB.name
        // let picName = filenameMaker(picture, category, name)

        const filter = Object.keys(req.body).reduce((acc, item) => {
            // console.log(item);
            if (item != 'id') acc[item] = req.body[item]

            return acc
        }, {})
        if (picture?.name) filter.picture =filenameMaker(picture, category, name)

        let images = Object.keys(req.files || {}).reduce((acc, item) => {
            if (item != 'picture') {
                acc.push(req?.files[item])
            }
            return acc
        }, [])
        console.log(filter);

                const good = await Good
                .findByIdAndUpdate(id,filter)
                .then(data=>data)
                .catch(err=>console.log(err))
                if (picture?.name){

                    const goodPic = await Image
                    .create({
                        image: good.picture,
                        goodId: id
                    })
                    .then(data => {
                        picture.mv(path.resolve(__dirname, '..', 'images', data.image))
        
                        return data
                    }
                    )
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
                return goodImage
            }))
        }
        // res.json({good})
        res.json({messege:`Товар ${good.name} оновлено. Оневлені поля: ${Object.keys(filter).map(item=>item)}` })
    } catch (error) {
        next(ApiErrors.badRequest(error.message))
        console.log(error)
    }
}
const removeImage =async(req,res,next)=>{
    try{
        const {image} = req.body
        console.log(image);
        const im = await Image
        //! .findOneAndDelete({image:{$eq: req.body.image}})
        .findOne({image:{$eq: req.body.image}})
        .then(data=>data)
        console.log(im);
        res.json({message:`Зображення ${im._id} видалено` || '000'})

    }catch(error){
        console.log(error);
        next(ApiErrors.badRequest(error.message))
    } 
}
const removeGood =async(req,res,next)=>{
    try{
        const {id} = req.body
        console.log(id);
        const good = await Good
        
        .findById(id)
        // !.findByIdAndDelete(id)
        .then(data=>data)
        console.log(good);
        res.json({message:`Товар ${good.name} видалено` || '000'})

    }catch(error){
        console.log(error);
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