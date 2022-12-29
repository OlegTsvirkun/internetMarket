import React, { useEffect, useState } from "react";
import { OptionOrderCard } from "../OptionOrderCard/OptionOrderCard";
import { host } from "../../host";
import styles from "./OrderDelivery.module.scss";
import { TbTruckDelivery } from "react-icons/tb";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { Input } from "../Input/Input";
import { DeliveryAdress } from "../DeliveryAdress/DeliveryAdress";
import { DeliveryPost } from "../DeliveryPost/DeliveryPost";
import { DeliverySelf } from "../DeliverySelf/DeliverySelf";
import { useDispatch } from "react-redux";

export const OrderDelivery = ({}) => {
	const [deliveryAdress, setDeliveryAdress] = useState(true);
	const [deliveryPost, setDeliveryPost] = useState(false);
	const [deliverySelf, setDeliverySelf] = useState(false);
	const dispatch = useDispatch();
	// useEffect(() => {

	// }, []);
	return (
		<div className={styles.orderDelivery}>
			<div className={styles.orderDelivery__toggle}>
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
					onClick={() => {
						setDeliveryAdress(true);
						setDeliveryPost(false);
						setDeliverySelf(false);
					}}
					checked={deliveryAdress}
				/>

				<OptionOrderCard
					icon={<img src={host + "NP.svg"} />}
					name="delivery"
					id="deliveryPost"
					title="Доставка НП"
					value="Доставка НП"
					subtitle="Доставимо завтра від:"
					deliveryPrice="200"
					onClick={() => {
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
					onClick={() => {
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
