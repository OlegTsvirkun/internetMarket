import React from 'react';
import { CartTableItem } from '../CartTableItem';
import styles from './CartItem.module.scss';
import { useSelector } from "react-redux";

export const CartItem = ({}) =>{
	const cart = useSelector((state) => state.cart.itemsInCart);

  return (
    <table className={styles.cartItem}>
    <thead >
      <tr className={styles.cartTable}>
          <th >No</th>
          <th >Изображение</th>
          <th >Наименование</th>
          <th >Количество</th>
          <th >Общая сумма</th>
          <th >Удалить товар</th>
      </tr>
    </thead>
          {Object.keys(cart).map((articul,index) => {
          return  <CartTableItem
            key = {articul}
            index = {index+1}
            articul ={articul}
            count = {cart[articul]}
            cart = {cart}
            />
            })}
            </table>
)};

