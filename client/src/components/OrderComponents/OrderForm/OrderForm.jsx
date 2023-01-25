import React, { createRef, useRef, useState } from "react";
import { Input } from "../../Input/Input";
import { OptionOrderCard } from "../OptionOrderCard/OptionOrderCard";
import styles from "./OrderForm.module.scss";
import { OrderDelivery } from "../OrderDelivery/OrderDelivery";
import { OrderContacts } from "../OrderContacts/OrderContacts";
import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export const OrderForm = ({ className }) => {

	const cart = useSelector((state) => state.cart.itemsInCart);
	const { isErrors } = useSelector((state) => state.order);
	const formRef = createRef();
	// const navigate = useNavigate();
	const dispatch = useDispatch();


	// const handleForm = () => {
	// 	const length = formRef.current.elements.length;
	// 	const inputs = formRef.current.elements;
	// 	let user = { name: "name" };
	// 	let delivery = {};
	// 	let orderedGoods = {};
	// 	for (let i = 0; i < length; i++) {
	// 		// console.log(isErrors[inputs[i].name],);
	// 		if (!inputs[i].value) {
	// 			user = {};
	// 			alert(`Заповніть поле ${inputs[i].dataset.caption}`);
	// 			break;
	// 		} else if (isErrors[inputs[i].name]) {
	// 			user = {};
	// 			alert(`Невірно заповнене поле ${inputs[i].dataset.caption}`);
	// 			break;
	// 		} else if (!Object.keys(cart)[0] || totalPrice == 0) {
	// 			user = {};
	// 			alert(`У кошику немає товарів`);
	// 			break;
	// 		}
		
	// 	}
	// 	if (!Object.keys(user)[0]) return false;
	// 	user = {
	// 		name: inputs.name.value,
	// 		firstname: inputs.firstname.value,
	// 		email: inputs.email.value,
	// 		tel: inputs.tel.value,
	// 	};
	// 	delivery = {
	// 		delivery: inputs.delivery.value,
	// 		city: inputs.city.value,
	// 		street: inputs.street?.value || "-",
	// 		house: inputs.house?.value || "-",
	// 		litHouse: inputs.litHouse?.value || "-",
	// 		appartment: inputs.appartment?.value || "-",
	// 		postNP: inputs.postNP?.value || "-",
	// 	};
	// 	Object.keys(cart).forEach((item) => {
	// 		orderedGoods[item] = {
	// 			id: cart[item]["_id"],
	// 			price: cart[item]["price"],
	// 			count: cart[item]["count"],
	// 			["totalPrice"]: cart[item]["count"] * cart[item]["price"],
	// 		};
	// 	});
	// 	let orderItem = {
	// 		user: { ...user },
	// 		orderedGoods: { ...orderedGoods },
	// 		delivery: { ...delivery },
	// 	};
	// 	dispatch(finishOrder(orderItem))
	// 	.then(
	// 		(res) => !res.err && navigate("/finish-order", { replace: true }),
	// 	);
	
	// };

	return (
		<form ref={formRef} className={`${styles.orderForm} ${className}`}>
		
				<OrderContacts className={styles.contacts} />
		
				<OrderDelivery className={styles.delivery}/>
		</form>
	
)
	}
