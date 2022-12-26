import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../../components/Button";
import { CartItem } from "../../components/CartItem";
import { ContentWrapper } from "../../components/ContentWrapper";
import { OrderForm } from "../../components/OrderForm/OrderForm";
import { Link } from "react-router-dom";
import styles from "./OrderPage.module.scss";

export const OrderPage = ({}) => {
	const cart = useSelector((state) => state.cart.itemsInCart);

	const totalPrice = Object.keys(cart).reduce(
		(acc, item) => (acc += cart[item].price * cart[item].count),
		0,
	);
	return (
		<div className={styles.orderPage}>
			<ContentWrapper className={styles.orderPage__container}>
				<h1>Оформление заказа</h1>
				<h3>Корзина</h3>
				<CartItem className={styles.orderPage__cart}/>
				<OrderForm  className={styles.orderPage__form}/>
				<div className={styles.orderPage__totalPrice}>
					Общая сумма: <span>{totalPrice}</span>{" "}
				</div>
				<Button className={styles.orderPage__checkout} >
					<Link to="">Оформить заказ</Link>
				</Button>
			</ContentWrapper>
		</div>
	);
};
