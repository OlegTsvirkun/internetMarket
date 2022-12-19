import { useDispatch, useSelector } from "react-redux";
    // const cart = useSelector((state) => state.cart.itemsInCart);
//   const {goods} = useSelector((state) => state.category);


// export const calcTotalPrice = (items)=> {
//     Object.keys(items).map(articul=> goods[articul]['price']*items[articul])
// }
// (items) => items.reduce((acc, item) => acc += +item.totalPrice, 0);

// .toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ')

export const priceFormating = (number)=> {
    if(number && !number.isNaN ){
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ')+ ' '};}