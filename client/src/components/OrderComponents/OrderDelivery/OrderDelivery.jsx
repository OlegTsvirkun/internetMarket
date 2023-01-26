import React, { useEffect, useState } from "react";
import { OptionOrderCard } from "../OptionOrderCard/OptionOrderCard";
import styles from "./OrderDelivery.module.scss";
import { TbTruckDelivery } from "react-icons/tb";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { DeliveryAdress } from "../DeliveryAdress/DeliveryAdress";
import { DeliveryPost } from "../DeliveryPost/DeliveryPost";
import { DeliverySelf } from "../DeliverySelf/DeliverySelf";
import { addError, addOrderData, addOrderDeliveryData, remooveError } from "../../../store/orderSlice";
import { useDispatch } from "react-redux";

export const OrderDelivery = ({className}) => {
	const [deliveryAdress, setDeliveryAdress] = useState(true);
	const [deliveryPost, setDeliveryPost] = useState(false);
	const [deliverySelf, setDeliverySelf] = useState(false);
	const dispatch = useDispatch();

useEffect(() => {
	let deliveryObj = {
		delivery:"Адресна доставка",
		city: '-',
		street:'-',
		house:'-',
		litHouse:'-',
		appartment:'-',
		postNP: '-',

	};
	dispatch(addOrderDeliveryData( deliveryObj))

	
}, []);

	const handleClick =(e)=>{
		dispatch(addOrderDeliveryData( {[e.target.name]:e.target.value}))
	}

	return (
		<div className={`${styles.orderDelivery} ${className}`}>
			<p className={styles.title} >Виберіть спосіб доставки:</p>
			<div className={styles.toggle}>
				<OptionOrderCard
					icon={
						<TbTruckDelivery
							size="50"
							color="#2FB5FC"
							style={{ strokeWidth: "1" }}
						/>
					}
					name="delivery"
					id="deliveryAdress"
					title="Адресна доставка"
					value="Адресна доставка"
					subtitle="Доставимо завтра від:"
					deliveryPrice="200"
					onClick={(e) => {
						handleClick(e)
						setDeliveryAdress(true);
						setDeliveryPost(false);
						setDeliverySelf(false);
					}}
					checked={deliveryAdress}
				/>

				<OptionOrderCard
					icon={<img src={process.env.REACT_APP_API_URL + "NP.svg"} />}
					name="delivery"
					id="deliveryPost"
					title="Доставка НП"
					value="Доставка НП"
					subtitle="Доставимо завтра від:"
					deliveryPrice="200"
					onClick={(e) => {
						handleClick(e)
						setDeliveryAdress(false);
						setDeliveryPost(true);
						setDeliverySelf(false);
					}}
					checked={deliveryPost}
				/>
				<OptionOrderCard
					icon={<TfiShoppingCartFull size="40" color="#2FB5FC" />}
					name="delivery"
					id="deliverySelf"
					title="Самовівоз із магазину:"
					value="Самовивіз із магазину:"
					subtitle="Забрати завтра"
					deliveryPrice="0"
					onClick={(e) => {
						handleClick(e)
						setDeliveryAdress(false);
						setDeliveryPost(false);
						setDeliverySelf(true);
					}}
					checked={deliverySelf}
				/>
			</div>

			{deliveryAdress && <DeliveryAdress />}
			{deliveryPost && <DeliveryPost />}
			{deliverySelf && <DeliverySelf />}
		</div>
	);
};