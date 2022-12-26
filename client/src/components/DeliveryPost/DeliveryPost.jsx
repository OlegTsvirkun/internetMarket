import React from 'react';
import { Input } from '../Input/Input';
import styles from './DeliveryPost.module.scss';

export const DeliveryPost = ({}) =>{
  return (
    <div className={styles.deliveryPost}>
    <Input
      require={true}
      type="text"
      charNumberMin={4}
      charNumberMax={9}
      name="cityDelivery"
      placeholder="Город"
      onChange={() => null}
    />
    <label htmlFor="post">Отделение НП</label>
    <Input
      className={styles.deliveryPost__postN}
      id="post"
      type="number"
      name="post"
      placeholder="№"
      onChange={() => null}
    /> 
  </div>
)};

