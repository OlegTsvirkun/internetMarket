import React from 'react';
import { Link } from 'react-router-dom';
import { USER_CABINET_ROUTE, USER_CONFIGS_ROUTE, USER_ORDERS_ROUTE } from '../../../utils/constRoutes';
import { ModalBackground } from '../../AdditionalComponents/ModalBackground/ModalBackground';
import styles from './UserMenu.module.scss';
const userMenu =[
  {title:'Мої закази',link: USER_CABINET_ROUTE+USER_ORDERS_ROUTE},
  {title:'Мої налаштування',link:USER_CABINET_ROUTE+USER_CONFIGS_ROUTE},
]

export const UserMenu = ({
  className='',
  logOutClick=()=>null,
  onClick=()=>null,

}) =>{
  return (
 <>
    {/* <ModalBackground/> */}
    <div className={`${styles.userMenu} ${className}`}>
    <ul className={styles.list}>
      {
        userMenu.map(row=>
        <Link className={styles.row} key ={row.title} to = {row.link} onClick={onClick}>  <li>{row.title}</li></Link>
          )
      }
      <li  className={styles.row} onClick={logOutClick} >ВИЙТИ</li>
      
    </ul>
    </div>
 </>
)};

