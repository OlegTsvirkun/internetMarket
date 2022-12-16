


import React from 'react'
import { priceFormating } from '../../hooks';
import { host } from '../../host';
import styles from './CartItem.module.scss';
export const CartItem = ({index, name, price, picture}) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__index} >{index}.</div>
      <img src = {host+picture}className={styles.cartItem__image}/>
      <span className={styles.cartItem__title}>{name}</span>
      <span className={styles.cartItem__price}>{priceFormating(price)}  &#8372;</span>
    </div>
  )
}
