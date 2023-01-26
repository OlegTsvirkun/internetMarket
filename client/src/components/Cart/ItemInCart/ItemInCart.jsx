

import React from 'react'
import styles from './ItemInCart.module.scss';

export const ItemsInCart = ({count}) => {
    return  count>0?(
      <div className={styles.itemInCart}>
{count}</div>
  ): null
}

