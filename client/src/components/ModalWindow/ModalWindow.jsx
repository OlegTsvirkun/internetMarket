import React ,{useEffect} from 'react';
import styles from './ModalWindow.module.scss';

export const ModalWindow = ({onClick , children, className}) =>{
 useEffect(() => {
  document.body.style.overflow = 'hidden'
  return () => {
    document.body.style.overflow = 'scroll'

  };
 }, []);

  return (
  <div onClick={onClick} className={`${styles.modalWindow} ${className}`}>
   {children}
  </div>
)};

