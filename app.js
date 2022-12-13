const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const Category = require('./models/category');
const Notebook= require('./models/notebook');
const Image = require('./models/image');
const Tablet = require('./models/tablet');
const app = express() 
// const PORT = 3000;
const bd = process.env.MONGO_URL
mongoose.set('strictQuery', false)
mongoose
    .connect(bd, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connected to DB'))
    .then(() => {
        app.listen(PORT, (error) => {
            error ? console.log(error) : console.log('LISTEN ON PORT:', PORT);
        })
    })
    .catch((error) => console.log(error));


app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.static('images'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get('/',async (req,res)=>{
const notebook =await Notebook
    .find().populate('category').exec()
    .then(notebooks => notebooks)
    .catch((error) => {
    //   console.log(error);
      res.status(500).json('Error:',error)
    });
const category = await Category
    .find()
    .then(categories => categories)
    .catch((error) => {
    //   console.log(error);
      res.status(500).json('Error:',error)
    });
    // res.status(200).json({category , notebook})
const image = await Image
    .find()
    .then(images => images)
    .catch((error) => {
    //   console.log(error);
      res.status(500).json('Error:',error)
    });
const tablet = await Tablet
    .find()
    .then(tablets => tablets)
    .catch((error) => {
    //   console.log(error);
      res.status(500).json('Error:',error)
    });
    res.status(200).json({category , notebook, image,tablet})

})


 