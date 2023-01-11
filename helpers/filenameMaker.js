const path = require('path');
const uuid = require('uuid');
const filenameMaker = (file,category,name='')=>{
  return  category + '-' + name.slice(0,16) + '-' + uuid.v4() + path.extname(file.name)
}
module.exports={
    filenameMaker
}