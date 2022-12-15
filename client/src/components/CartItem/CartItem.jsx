


import React from 'react'
import styles from './CartItem.module.scss';
export const CartItem = ({ title, price}) => {
  return (
    <div className={styles.cartItem}>
      <span className='basket-item__title'>{title}</span>
      <span className='basket-item__price'>{price}  &#8372;</span>
    </div>
  )
}
