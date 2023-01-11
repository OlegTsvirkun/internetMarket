const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const errorHandler = require('./middleware/ErrorHandlingMiddlware')
const PORT = process.env.PORT || 5000;
const bd = process.env.MONGO_URL_LOCAL

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static('images'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
mongoose.set('strictQuery', false)  

app.use(require('./routes/goods'))
app.use(require('./routes/contacts')) 

app.use(errorHandler)

const start = async()=>{
try{

 await mongoose 
    .connect(bd, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('Connected to DB'))
    .then(() => {
      app.listen(PORT,() => {
       console.log('LISTEN ON PORT:', PORT);
      })
    })
}
catch(error){
  console.log(error)
}
}

start()
