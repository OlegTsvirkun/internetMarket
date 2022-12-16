
import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { CartItem } from "../CartItem";
import { Button } from "../Button";
import { BsX } from "react-icons/bs";
import { calcTotalPrice, priceFormating } from "../../hooks";

import styles from './CartMenu.module.scss';
import { openCartMenu } from "../../store/cartSlice";

export const CartMenu = ({ cart, onClick, ref }) => {
  const isVisible = useSelector((state) => state.cart.isCartOpen)
const dispatch = useDispatch()
  return (
    isVisible && 
    <div className={styles.cartMenu}>
      <div className={styles.cartMenu__topBar}><span>Корзина</span>{<BsX className={styles.cartMenu__close} size='25'onClick={	()=>	dispatch(openCartMenu(!isVisible))
} />}</div>
      <div className={styles.cartMenu__goodList}>
        {
          cart.length > 0? 
          <CartItem/>
      
            : "Корзина пуста"}
      </div>
      {
      cart.length > 0 ? 
      (
        <div className={styles.cartMenu__arrange}>
          <div className={styles.cartMenu__totalPrice}>
            <span>Итого:</span>
            <span>
              {priceFormating(calcTotalPrice(cart)) + " "} 
                &#8372;</span>
          </div>
          <Button  onClick={onClick}>
            Оформить заказ
          </Button>
        </div>
      ) : null}
     
    </div>
  );
};
