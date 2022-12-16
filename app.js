const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const Category = require('./models/category');
const Good = require('./models/good');
const Image = require('./models/image');
const app = express()
const bd = process.env.MONGO_URL_LOCAL
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
app.use(cors())
app.use(express.static('images'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.get('/', async (req, res) => {
  const category = await Category
    .find({},{description:0})
    .then(categories => {
      return categories.reduce((acc, item) => {
        acc[item['_id']] = item.category
        return acc
      }, {})
    })
    .catch((error) => {
      res.status(500).json('Error:', error)
    });
  const goods = await Good
    .find({},{description:0, price:0}).populate('category').exec()
    .then(good => { 
      return good
   
  })
    .catch((error) => { 
      res.status(500).json('Error:', error)
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
      console.log(error);
      // res.status(500).json('Error:', error) 
    });

  res.status(200).json({ category, goods, image })

})

app.get('/cat/:id', async (req,res)=>{
console.log( req.params.id)
const catName = req.params.id
const goods = await Good
    .find()
    .populate({
      path: 'category',
      match: {category:{$eq: catName},
      
    }
    })
    .exec()
    .then(good => {  
      
      return good
      .filter(item=> item.category)
   
  })
  .catch((error) => { 
    res.status(500).json({'Error:': error})
  });
  res.status(200).json({ goods})

})
