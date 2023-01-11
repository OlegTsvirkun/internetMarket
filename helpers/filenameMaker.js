const path = require('path');
const filenameMaker = (file,category,name)=>{
  return  category + '-' + name + '-' + Date.now() + path.extname(file.name)
}
module.exports={
    filenameMaker
}