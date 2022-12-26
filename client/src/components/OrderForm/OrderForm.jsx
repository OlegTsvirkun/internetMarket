import React, { useState } from "react";
import { Input } from "../Input/Input";
import { OptionOrderCard } from "../OptionOrderCard/OptionOrderCard";
import styles from "./OrderForm.module.scss";
import { OrderDelivery } from "../OrderDelivery/OrderDelivery";
import { OrderContacts } from "../OrderContacts/OrderContacts";

export const OrderForm = ({className}) => {
	const [contacts, setContacts] = useState(true);
	const [delivery, setDelivery] = useState(false);
	return (
		<form className={`${styles.orderForm} ${className}`}>
			<div className={`${!contacts? styles.orderForm__contacts : styles.orderForm__contacts + ' ' + styles.active}`}  id='OFContacts' onClick={()=>{
				setContacts(true)
				setDelivery(false)
			}}>{contacts?<OrderContacts/>:<div className={styles.caption} >Заполнить контакты</div>}  </div>
		
			<div id='OFDelivery' className={`${!delivery? styles.orderForm__delivery : styles.orderForm__delivery + ' ' +styles.active}`} onClick={()=>{
				setContacts(false)
				setDelivery(true)
			}}>
				{delivery ? <OrderDelivery/> :<div className={styles.caption}>Способ доставки</div>}  </div>
		</form>
	);
};
