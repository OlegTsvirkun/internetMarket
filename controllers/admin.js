
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


const createCategory = async (req, res, next) => {
    try{
const {category,description }= req.body
const {picture} = req.files
if(!category) next(ApiErrors.badRequest('Не вказана категорія'))
if(!description) next(ApiErrors.badRequest('Не вказан опис'))
if(!picture) next(ApiErrors.badRequest('Не вказано зображення'))
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
            res.json({response:`Категорія ${cat.category} додана`})
    }catch(error){
        next(ApiErrors.internal(
            error.message
            ))

    }
}
const createGood = async (req, res, next) => {
    try {
        const {name, articul, price , category,  description } = req.body
        const {  picture} = req.files
        console.log(picture);
        // let picExt =picture.name.split('.').slice(-1),
        let picName = filenameMaker(picture, category, name)
let images = Object.keys(req.files).reduce((acc,item)=> {
    if(item!='picture'){
        acc.push(req.files[item])
    }
    return acc
},[])
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
            }).then(data=>{
               return data[0]})
            .catch(err=>{if(err) throw err})
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
        res.json({response:`Товар ${good.name} додано`})
        // res.json({
        //     cat,
        //     goodPic,
        //     good,
        //     goodPic,
        //     goodImages
        // })
        // res.json({name, articul, price , category,  description })

    } catch (error) {
        if(error){
         
        }
        next(ApiErrors.badRequest(error.message))
    }
}
const updateGood =async(req,res,next)=>{
const {id} =req.query

    try{

    }catch(error){

    }
}


module.exports = {
    createCategory,
    createGood
}