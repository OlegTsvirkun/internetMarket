export const getCartFromLS = ()=>{
 let cartLS = localStorage.getItem('cart') 
 
    return cartLS? JSON.parse(cartLS) :{}
 
}