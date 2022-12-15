
import React, { useCallback, useRef} from "react";

import { useDispatch, useSelector } from "react-redux";
// import { CartMenu } from "../basket_menu";
// import { calcTotalPrice } from "../func";
// import { ItemsInCart } from "../items_in_card/items-in-card";
import { useNavigate } from "react-router";
import { BsCart } from "react-icons/bs";
// import { openCartMenu } from "../../redux/cartSlice";
import styles from './CartBlock.module.scss';
import { CartMenu } from "../CartMenu/";


export const CartBlock = () => {
  // const basket = useSelector((state) => state.cart.itemsInCart);
  // const totalPrice = calcTotalPrice(basket);
  // const navigate = useNavigate();
  // const isVisible = useSelector(state=>state.cart.isCartOpen)
  const dispatch = useDispatch()
  const cartBlock = useRef()

  const handleClick = useCallback(() => {
  //   dispatch(openCartMenu(false));
  //   // navigate("/order");
  }, 
  // [navigate]
  );

  
  const openMenu = useCallback(()=>{
  //   dispatch(openCartMenu(!isVisible)) 
  //   const notMenu=(event)=>{
  //     if(!event.path.includes(cartBlock.current)){
  //       dispatch(openCartMenu(false))
  //       document.body.removeEventListener('click',notMenu)
  //     }
  //   }
  //   document.body.addEventListener('click',notMenu) 
  },
  // [isVisible]
  )
  return (
    <div ref ={cartBlock}   className="cart-block" >
      <BsCart
        size={35}
        className="cart-block__icon"
        name="cart-block"
        
        // onClick={
          // openMenu
          // dispatch(openCartMenu(!isVisible))
        // }
      />
      {/* <ItemsInCart count={basket.length} /> */}
      {/* {totalPrice !== 0 ? (
        <span className="cart-block__total-price">{totalPrice} &#8372;</span>
      ) : null} */}
      {
    //   // isVisible && 
     <CartMenu 
    //  basket={basket} 
    //  onClick={handleClick} 
     />}
    </div>
  );
};
