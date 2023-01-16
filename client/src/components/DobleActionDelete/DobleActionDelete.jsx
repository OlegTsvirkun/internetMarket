import React, { useState } from 'react';
import {IoCloseOutline} from "react-icons/io5"

import styles from './DobleActionDelete.module.scss';

export const DobleActionDelete = ({
 
  onClick=()=>null
}) =>{
	const[isDeleteVisible,setIsDeleteVisible] =useState(false)

  return (
  <div className={styles.dobleActionDelete}>
   {!isDeleteVisible &&<span className={styles.dobleActionDelete__delete} onClick={()=>setIsDeleteVisible(true) }> <IoCloseOutline  size='30' /></span>}
								{
								isDeleteVisible &&
								<>
									 <span onClick={onClick}><IoCloseOutline className={styles.dobleActionDelete__deleteIcon}  size='80' /></span>
									 <div className={styles.dobleActionDelete__deleteBackground}></div>
								</>
								 }
  </div>
)}; 

