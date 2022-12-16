export const calcTotalPrice = (items) => items.reduce((acc, item) => acc += +item.price, 0);

// .toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ')

export const priceFormating = (number)=> {
    if(number && !number.isNaN ){
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ')};}