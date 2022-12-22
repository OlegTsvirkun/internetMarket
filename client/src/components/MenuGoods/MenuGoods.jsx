import React from 'react';
import {Link} from 'react-router-dom'
import styles from './MenuGoods.module.scss';

export const MenuGoods = ({goods,className}) =>{
  // console.log(Object.keys(goods).map(item=>goods[item].name));
  return (
  <div className={`${styles.menuGoods} ${className}`}>
    <ul >
     {Object.keys(goods).map(good=>
     <Link
     key={goods[good]._id}
     to={`good?id=${goods[good]._id}`}
     
    //  className={styles.goodsList__title}
     
     onClick={''}
     >
     <li className={styles.menuGoods__item} key = {goods[good]._id} >{goods[good].name}</li>
     </Link>
     ) }
    </ul>
  </div>
)};

