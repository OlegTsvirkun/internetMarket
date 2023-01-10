const ApiErrors = require('../helpers/ApiErrors')

module.exports = function(err,req,res,next){
    if(err instanceof ApiErrors){
        return res.status(err.status).json({message: err.message})
    }
    res.status(500).json({message: "Непередбачувальна помилка!"})
}