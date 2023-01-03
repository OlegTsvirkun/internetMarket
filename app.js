const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

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

app.use(require('./routes/goods'))
app.use(require('./routes/contacts')) 
