import React from "react";
import styles from "./OrderForm.module.scss";
import { OrderDelivery } from "../OrderDelivery/OrderDelivery";
import { OrderContacts } from "../OrderContacts/OrderContacts";

export const OrderForm = ({ className }) => {
	return (
		<form  className={`${styles.orderForm} ${className}`}>
			<div className={styles.notice} > <span
					style={{
						color: "red",
					}}
				>
					* Поля обов'язкові для заповнення
				</span></div>
				<OrderContacts className={styles.contacts} />
				<OrderDelivery className={styles.delivery}/>
		</form>
)
	}
