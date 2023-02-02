import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrderData, getUserOrder } from '../../../store/userCabinetSlice';
import {priceFormating} from '../../../utils/priceFormating';
import styles from './UserOrders.module.scss';

export const UserOrders = ({}) =>{
  const dispatch = useDispatch()
  const {email} = useSelector(state=>state.user)
const {userId} = useSelector(state=>state.userCabinet.orderData)
const {orderData,isLoading,isError} = useSelector(state=>state.userCabinet)

  useEffect(() => {
    console.log(userId);
    if(email)dispatch(getUserOrder(email))
    if(email!=='userId') dispatch(clearOrderData())
    // Object.values(orderData).map(item=>console.log(item))
    return () => {
      dispatch(clearOrderData())
    };
  }, [email]);
  if(isLoading) return<>Loading...</>
  return (
  <div className={styles.userOrders}>
{Object.values(orderData).map(order=>{
  if(typeof order ==='object')return(
<div key={order.orderId} className={styles.userOrdersGrid}>
  <div className={styles.headerNumber}>Заказ номер: {order.orderId}</div>
  <div className={styles.headerDate}>Дата заказу: {order.createdAt}</div>
  <div className={styles.status}>Статус: {order.status}</div>
  <div className={styles.statusUpdated}>Статус оновлено: {order.updatedAt}</div>
  <div className={styles.goodsList}>
    <div >Список товарів:</div>
    <ul >
      {
        order?.goods?.map(good=>(
        <li className={styles.good} key ={good.articul}>
          <div className={styles.goodName}>{good.name}</div>
          <div className={styles.count}>Кількість: {good.count}</div>
          <div className={styles.price}>Ціна: {priceFormating(good.price)} грн.</div>
          <div className={styles.articul}>Артикул: {good.articul}</div>
          <img className={styles.image} src={process.env.REACT_APP_API_URL+good.picture} alt="" />
        </li>
      ))
    }
   </ul>
  </div>
  <div className={styles.deliveryInfo}>{order.createdAt}</div>
</div>
)})}
    
  </div>
)};

