import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../../components/UA_Components/Button";
import { CartItem } from "../../../components/Cart/CartItem";
import { ContentWrapper } from "../../../components/UA_Components/ContentWrapper/";
import { OrderForm } from "../../../components/OrderComponents/OrderForm/OrderForm";
import { Link, useNavigate } from "react-router-dom";
import styles from "./OrderPage.module.scss";
import { createRef } from "react";
import { host } from "../../../axios";
import { finishOrder } from "../../../store/orderSlice";
import { priceFormating } from "../../../utils/priceFormating";
import { FINISH_ORDER_ROUTE } from "../../../utils/constRoutes";
import { clearCart } from "../../../store/cartSlice";
export const OrderPage = ({}) => {
	const cart = useSelector((state) => state.cart.itemsInCart);
	const { isErrors, orderData } = useSelector((state) => state.order);
	// const formRef = createRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const totalPrice = Object.keys(cart).reduce(
		(acc, item) => (acc += cart[item].price * cart[item].count),
		0,
	);
	const handleForm = () => {
		// const length = formRef.current.elements.length;
		// const inputs = formRef.current.elements;
		// let user = { };
		// let delivery = {};
		let orderedGoods = {};
		// for (let i = 0; i < length; i++) {
		// 	// console.log(isErrors[inputs[i].name],);
		// 	if (!inputs[i].value) {
		// 		user = {};
		// 		alert(`Заповніть поле ${inputs[i].dataset.caption}`);
		// 		break;
		// 	} else if (isErrors[inputs[i].name]) {
		// 		user = {};
		// 		alert(`Невірно заповнене поле ${inputs[i].dataset.caption}`);
		// 		break;
		// 	} else if (!Object.keys(cart)[0] || totalPrice == 0) {
		// 		user = {};
		// 		alert(`У кошику немає товарів`);
		// 		break;
		// 	}
		// 	// else {
		// 	// 	user[inputs[i].name]= inputs[i].value
		// 	// }
		// }
		// if (!Object.keys(isErrors)[0]) return false;
		// let user = {
		// 	name: orderData.name,
		// 	firstname: orderData.firstname,
		// 	email: orderData.email,
		// 	tel: orderData.tel,
		// };
		// let delivery = {
		// 	delivery: orderData.delivery,
		// 	city: orderData.city,
		// 	street: orderData.street || "-",
		// 	house: orderData.house || "-",
		// 	litHouse: orderData.litHouse || "-",
		// 	appartment: orderData.appartment || "-",
		// 	postNP: orderData.postNP || "-",
		// };
		Object.keys(cart).forEach((item) => {
			orderedGoods[item] = {
				id: cart[item]["_id"],
				price: cart[item]["price"],
				count: cart[item]["count"],
				["totalPrice"]: cart[item]["count"] * cart[item]["price"],
			};
		});
		let orderItem = {
			...orderData,
			orderedGoods: { ...orderedGoods },
		};
		// console.log(orderItem);

		dispatch(finishOrder(orderItem)).then((res) => {
			if (!res.err) {
				navigate(FINISH_ORDER_ROUTE, { replace: true });

				dispatch(clearCart())
			}
		});
		// host
		// 	.post(FINISH_ORDER_ROUTE, orderItem)
		// 	.then((res) => console.log(res.data))
		// 	.catch((err) => console.log(err));
		// 	// .finally(()=>navigate('/finish-order', {replace:true}))
	};
	return (
		<div className={styles.orderPage}>
			<ContentWrapper className={styles.orderPage__container}>
				<h1>Оформлення замовлення</h1>
				<h3>Кошик</h3>
				<CartItem className={styles.orderPage__cart} />
				<OrderForm className={styles.orderPage__form} />
				<div className={styles.orderPage__totalPrice}>
					Загальна сума: <span>{priceFormating(totalPrice)} грн.</span>{" "}
				</div>
				{!Object.keys(isErrors)[0] && (
					<Button className={styles.orderPage__checkout} onClick={handleForm}>
						Оформити замовлення
					</Button>
				)}
			</ContentWrapper>
		</div>
	);
};
