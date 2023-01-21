import React ,{useEffect} from 'react';
import styles from './ModalBackground.module.scss';

export const ModalBackground = ({onClick , children, className}) =>{
 useEffect(() => {
  document.body.style.overflow = 'hidden'
  return () => {
    document.body.style.overflow = 'scroll'

  };
 }, []);

  return (
  <div onClick={onClick} className={`${styles.modalBackground} ${className}`}>
   {children}
  </div>
)};

