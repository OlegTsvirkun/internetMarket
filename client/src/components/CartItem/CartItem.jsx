import React from 'react';
import { CartTableItem } from '../CartTableItem';
import styles from './CartItem.module.scss';
import { useSelector } from "react-redux";

export const CartItem = ({className}) =>{
	const cart = useSelector((state) => state.cart.itemsInCart);

  return (
    <table className={`${styles.cartItem} ${className}`}>
    <thead >
      <tr className={styles.cartTable}>
          <th >No</th>
          <th >Зображення</th>
          <th >Найменування</th>
          <th >Кількість</th>
          <th >Загальна сума</th>
          <th >Видалити товар</th>
      </tr>
    </thead>
          {Object.keys(cart).map((articul,index) => {
          return  <CartTableItem
            key = {articul}
            index = {index+1}
            articul ={articul}
            count = {cart[articul].count}
            price ={cart[articul].price}
            cart = {cart}
            />
            })}
            </table>
)};

