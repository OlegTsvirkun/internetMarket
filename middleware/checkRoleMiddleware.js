const jwt = require('jsonwebtoken')
module.exports = function(role){
return function(req,res,next){
    console.log('1111111');
    if(req.method === 'OPTIONS'){
        next()
    }
    try{
req.headers.authorization.split(' ')[1]
if(!token){
res.status(401).json({message: "Не авторизований"})

}
const decoded = jwt.verify(token, process.env.SECRET_KEY)
if(decoded.role !== role){
    return res.status(403).json({message: "Немає доступу"})
}
req.user = decoded
next()
    }catch(error){
res.status(401).json({message: "Не авторизований"})
    }
}

}