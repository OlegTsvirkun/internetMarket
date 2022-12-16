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
          <th className={styles.cartTable__index}>No</th>
          <th className={styles.cartTable__image}>Изображение</th>
          <th className={styles.cartTable__title}>Наименование</th>
          <th className={styles.cartTable__count}>Количество</th>
          <th className={styles.cartTable__price}>Общая сумма</th>
      </tr>
    </thead>
          {cart.map((item,index) => {
            console.log(item);
          return  <CartTableItem
            key = {item._id}
            index = {index+1}
           item ={item}
            />
            })}
            </table>
)};

