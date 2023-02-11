import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MANAGER_LIST_ROUTE } from '../../../utils/constRoutes';
import { statusColor, statusTranslate } from '../../../utils/constUserOrder';
import { Button } from '../../UA_Components/Button/Button';
import styles from './ManagerPanel.module.scss';

export const ManagerPanel = ({
  className=''
}) =>{
  const {statuses} = useSelector(state=> state.managerCabinet)

  if(!statuses.length) return <>Loading...</>
  return (
  <div className={`${styles.managerPanel} ${className}`}>
    {statuses.map(status=>
    <Link key ={status} to={`${MANAGER_LIST_ROUTE}?status=${status}`}>
      <Button 
      containerClassName={styles.panelButtonContainer}
      className={styles.panelButton}
      style={{backgroundColor:`${statusColor[status]}`}} 
      >{statusTranslate[status]}</Button>
    </Link >
    
    )}
  </div>
)};

