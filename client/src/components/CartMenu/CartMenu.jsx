
import React from "react";
import { useSelector } from "react-redux";
import { CartItem } from "../CartItem";
import { Button } from "../Button";
import { calcTotalPrice, priceFormating } from "../../hooks";
import styles from './CartMenu.module.scss';

export const CartMenu = ({ cart, onClick, ref }) => {
  const isVisible = useSelector((state) => state.cart.isCartOpen)

  return (
    isVisible && 
    <div className={styles.cartMenu}>

      <div className={styles.cartMenu__gameList}>
        {
        cart.length > 0? 
          cart.map((items,index) => (
            <CartItem
            index = {index+1}
              key={items.articul}
              name={items.name}
              price={items.price}
              picture={items.picture}
               
              articul={items.articul}
            />
          ))
          : "Корзина пуста"}
      </div>
      {
      cart.length > 0 ? 
      (
        <div className={styles.cartMenu__arrange}>
          <div className={styles.cartMenu__totalPrice}>
            <span>Итого:</span>
            <span>
              {priceFormating(calcTotalPrice(cart))}
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
