import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../../components/UA_Components/Button/Button";
import { CartItem } from "../../../components/Cart/CartItem";
import { ContentWrapper } from "../../../components/UA_Components/ContentWrapper/ContentWrapper";
import { OrderForm } from "../../../components/OrderComponents/OrderForm/OrderForm";
import {  useNavigate } from "react-router-dom";
import styles from "./OrderPage.module.scss";
import { finishOrder } from "../../../store/orderSlice";
import { priceFormating } from "../../../utils/priceFormating";
import { FINISH_ORDER_ROUTE } from "../../../utils/constRoutes";
import { clearCart } from "../../../store/cartSlice";

export const OrderPage = ({}) => {
	const cart = useSelector((state) => state.cart.itemsInCart);
	const {email} = useSelector((state) => state.user);
	const { isErrors, orderData } = useSelector((state) => state.order);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const totalPrice = Object.keys(cart).reduce(
		(acc, item) => (acc += cart[item].price * cart[item].count),
		0,
	);

	const handleForm = () => {
		let orderedGoods = Object.keys(cart).map((item) => {
			return Object.keys(cart[item]).reduce((acc,keys)=>{
				console.log(keys);
				
				if(keys !='category' && keys !='description' ) 	acc[keys]=cart[item][keys]
				
				return acc
			},{}) 
		
		});
		console.log(orderedGoods);
		let orderItem = {
			...orderData,
			orderedGoods: [ ...orderedGoods ],
			totalPrice:totalPrice,
			
		};
		if(email) orderItem.login = email
		console.log(orderItem);
		dispatch(finishOrder(orderItem)).then((res) => {
			console.log(res.error);
			if (!res.error) {
				navigate(FINISH_ORDER_ROUTE, { replace: true });
				// dispatch(clearOrderSlice());
				dispatch(clearCart());
			}
		});
	};
	return (
		<ContentWrapper className={styles.container}>
			<h1 className={styles.title}>Оформлення замовлення</h1>
			<h3 className={styles.Subtitle}>Кошик</h3>
			<CartItem className={styles.cart} />
			<OrderForm className={styles.form} />
			<div className={styles.totalPrice}>
				Загальна сума:{" "}
				<span>{totalPrice ? priceFormating(totalPrice) : "0.0"} грн.</span>
			</div>
			{!Object.keys(isErrors)[0] && totalPrice > 0 && (
				<Button className={styles.checkout} onClick={handleForm}>
					Оформити замовлення
				</Button>
			)}
		</ContentWrapper>
	);
};
