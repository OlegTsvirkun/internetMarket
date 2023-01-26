import React from "react";
import styles from "./OrderForm.module.scss";
import { OrderDelivery } from "../OrderDelivery/OrderDelivery";
import { OrderContacts } from "../OrderContacts/OrderContacts";

export const OrderForm = ({ className }) => {
	return (
		<form  className={`${styles.orderForm} ${className}`}>
				<OrderContacts className={styles.contacts} />
				<OrderDelivery className={styles.delivery}/>
		</form>
)
	}
