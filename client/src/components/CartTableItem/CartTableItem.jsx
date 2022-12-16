


import React from 'react'
import { priceFormating } from '../../hooks';
import { host } from '../../host';
import styles from './CartTableItem.module.scss';
export const CartTableItem = ({index,item}) => {
  console.log(item);
  return (
 
  <tbody className={styles.cartItem}>
  <tr>
          <th className={styles.cartItem__index} >{index}.</th>
          <th><img src = {host+item.picture}className={styles.cartItem__image}/></th>
          <th><span className={styles.cartItem__title}>{item.name}</span></th>
          <th className={styles.cartItem__count}>{item.count}</th>
          <th><span className={styles.cartItem__price}>{priceFormating(item.price)}  &#8372;</span> </th> 
      </tr>
  </tbody>

  )
}
