const jwt = require('jsonwebtoken')
module.exports = function(req,res,next){
    if(req.method === 'OPTIONS'){
        next()
    } 
    console.log('req.headers',req.headers.autorization);
    try{
const token = req.headers.autorization.split(' ')[1]
console.log('token: ', token);
if(!token){
res.status(401).json({message: "Не авторизований"})

}
const decoded = jwt.verify(token, process.env.SECRET_KEY)
req.user = decoded
next()
// if(decoded.role !== role){
//     return res.status(403).json({message: "Немає доступу"})
// }
    }catch(error){
res.status(401).json({message: "Не авторизований"})
    }
}