
import React from "react";
import { useSelector } from "react-redux";
import { CartItem } from "../CartItem";
import { Button } from "../Button";
// import { calcTotalPrice } from "../func";
import styles from './CartMenu.module.scss';

export const CartMenu = ({ basket, onClick, ref }) => {
  // const isVisible = useSelector((state) => state.cart.isCartOpen)

  return (
    // isVisible && 
    <div className={styles.cartMenu}>

      <div className="basket-menu__game-list">
        {/* {
        basket.length > 0? 
          basket.map((items) => (
            <CartItem
              key={items.articul}
              title={items.title}
              price={items.price}
              articul={items.articul}
            />
          ))
          : "Корзина пуста"} */}
      </div>
      {/* {
      basket.length > 0 ? 
      (
        <div className="basket-menu__arrange">
          <div className="basket-menu__total-price">
            <span>Итого:</span>
            <span>{calcTotalPrice(basket)} &#8372;</span>
          </div>
          <Button size="m" type="primary" onClick={onClick}>
            Оформить заказ
          </Button>
        </div>
      ) : null} */}
    </div>
  );
};
