import React from 'react';
import { Button } from '../../UA_Components/Button/Button';
import styles from './UserButton.module.scss';

export const UserButton = ({
  onClick
}) =>{
  return (
  <div className={styles.userButton}>
   <Button isOrangeButton={true} onClick={onClick}>
    NAME
   </Button>
  </div> 
)};

