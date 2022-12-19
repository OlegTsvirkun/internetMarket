


import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { priceFormating } from '../../hooks';
import { host } from '../../host';
import { removeFromCart } from '../../store/cartSlice';
import { CountChanger } from '../CountChanger/CountChanger';
import styles from './CartTableItem.module.scss';

export const CartTableItem = ({index,articul, count,cart}) => {
  const dispatch = useDispatch();
  const {goods} = useSelector((state) => state.category);
  const price = goods[articul]['price']*count;

  const name = goods[articul]['name']
  const picture = goods[articul]['picture']

  return (
 
  <tbody className={styles.cartTable}>
  <tr>
          <th >{index}.</th>
          <th><img src = {host+picture}/></th>
          <th>{name}</th>
          <th><CountChanger count = {count} articul = {articul} /> </th>
          <th>
            {priceFormating(price)}
             &#8372; </th> 
             <th className={styles.removeGood}  onClick={()=>dispatch(removeFromCart(articul))}>&#10006;</th>
      </tr>
  </tbody>

  )
}
