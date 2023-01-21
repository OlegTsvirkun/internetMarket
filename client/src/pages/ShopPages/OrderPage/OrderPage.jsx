import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../../components/Button";
import { CartItem } from "../../../components/Cart/CartItem";
import { ContentWrapper } from "../../../components/ContentWrapper";
import { OrderForm } from "../../../components/OrderForm/OrderForm";
import { Link, useNavigate } from "react-router-dom";
import styles from "./OrderPage.module.scss";
import { createRef } from "react";
import axios from "../../../axios";
import { finishOrder } from "../../../store/orderSlice";
import { priceFormating } from "../../../utils/priceFormating";
export const OrderPage = ({}) => {
	const cart = useSelector((state) => state.cart.itemsInCart);
	const { isErrors } = useSelector((state) => state.order);
	const formRef = createRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const totalPrice = Object.keys(cart).reduce(
		(acc, item) => (acc += cart[item].price * cart[item].count),
		0,
	);
	const handleForm = () => {
		const length = formRef.current.elements.length;
		const inputs = formRef.current.elements;
		let user = { name: "name" };
		let delivery = {};
		let orderedGoods = {};
		for (let i = 0; i < length; i++) {
			// console.log(isErrors[inputs[i].name],);
			if (!inputs[i].value) {
				user = {};
				alert(`Заповніть поле ${inputs[i].dataset.caption}`);
				break;
			} else if (isErrors[inputs[i].name]) {
				user = {};
				alert(`Невірно заповнене поле ${inputs[i].dataset.caption}`);
				break;
			} else if (!Object.keys(cart)[0] || totalPrice == 0) {
				user = {};
				alert(`У кошику немає товарів`);
				break;
			}
			// else {
			// 	user[inputs[i].name]= inputs[i].value

			// }
		}
		if (!Object.keys(user)[0]) return false;
		user = {
			name: inputs.name.value,
			firstname: inputs.firstname.value,
			email: inputs.email.value,
			tel: inputs.tel.value,
		};
		delivery = {
			delivery: inputs.delivery.value,
			city: inputs.city.value,
			street: inputs.street?.value || "-",
			house: inputs.house?.value || "-",
			litHouse: inputs.litHouse?.value || "-",
			appartment: inputs.appartment?.value || "-",
			postNP: inputs.postNP?.value || "-",
		};
		Object.keys(cart).forEach((item) => {
			orderedGoods[item] = {
				id: cart[item]["_id"],
				price: cart[item]["price"],
				count: cart[item]["count"],
				["totalPrice"]: cart[item]["count"] * cart[item]["price"],
			};
		});
		let orderItem = {
			user: { ...user },
			orderedGoods: { ...orderedGoods },
			delivery: { ...delivery },
		};
		dispatch(finishOrder(orderItem)).then(
			(res) => !res.err && navigate("/finish-order", { replace: true }),
		);
		// 	axios
		// 		.post("/finish-order", orderItem)
		// 		.then((res) => console.log(res.data))
		// 		.catch((err) => console.log(err));
		// 	// .finally(()=>navigate('/finish-order', {replace:true}))
	};
	return (
		<div className={styles.orderPage}>
			<ContentWrapper className={styles.orderPage__container}>
			<h1>Оформлення замовлення</h1>
<h3>Кошик</h3>
				<CartItem className={styles.orderPage__cart} />
				<OrderForm ref={formRef} className={styles.orderPage__form} />
				<div className={styles.orderPage__totalPrice}>
				Загальна сума: <span>{priceFormating(totalPrice)} грн.</span>{" "}
				</div>
				<Button className={styles.orderPage__checkout} onClick={handleForm}>
				Оформити замовлення
				</Button>
			</ContentWrapper>
		</div>
	);
};
