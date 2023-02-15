const sortGood =(sortQuery)=>{
    let sortType
    if(sortQuery=='az')  sortType={name:1}
    if(sortQuery=='za')  sortType={name:-1}
    if(sortQuery=='expens')  sortType={price:-1}
    if(sortQuery=='cheap')  sortType={price:1}
return sortType

}
module.exports =sortGood