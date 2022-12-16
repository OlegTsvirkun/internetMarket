import React from 'react';
import { useSelector } from "react-redux";

import styles from './Modal.module.scss';

export const Modal = ({}) =>{
  const isVisible = useSelector((state) => state.cart.isCartOpen)
  return (
  isVisible &&<div className={styles.modal}>
  </div>
)};

