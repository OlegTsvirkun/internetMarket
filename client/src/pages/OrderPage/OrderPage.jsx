import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../../components/Button";
import { CartItem } from "../../components/CartItem";
import { ContentWrapper } from "../../components/ContentWrapper";
import { OrderForm } from "../../components/OrderForm/OrderForm";
import { Link } from "react-router-dom";
import styles from "./OrderPage.module.scss";
import { createRef } from "react";

export const OrderPage = ({}) => {
	const cart = useSelector((state) => state.cart.itemsInCart);
	const {isErrors}= useSelector((state) => state.order);
const formRef = createRef()

const totalPrice = Object.keys(cart).reduce(
	(acc, item) => (acc += cart[item].price * cart[item].count),
	0,
);
const handleForm = ()=>{
	const length = formRef.current.elements.length
	const inputs =formRef.current.elements
	let userInfo = {}
	let orderedGoods = {}
	for(let i = 0;i< length; i++){
		console.log(isErrors[inputs[i].name],);
		if(!inputs[i].value){
			userInfo = {}
			alert(`Заполните поле ${inputs[i].dataset.caption}`)
			break 
		}else if(isErrors[inputs[i].name]){
			userInfo = {}
			alert(`Неверно заполнено поле ${inputs[i].dataset.caption}`)
			break 
		}
		else if(!Object.keys(cart)[0] || totalPrice == 0){
			userInfo = {}
			alert(`В корзине нет товаров`)
			break 
		}
		else {
			userInfo[inputs[i].name]= inputs[i].value

		}
	}

	if(!Object.keys(userInfo)[0]) return false
	Object.keys(cart).forEach(item=>{
		orderedGoods[item]={
			id:cart[item]['_id'],
			price:cart[item]['price'],
			count:cart[item]['count'],
			totalCost: cart[item]['count']* cart[item]['price']
		}
	})
	orderedGoods.generalCost = totalPrice
		let orderItem = {userInfo:{...userInfo},orderedGoods:{...orderedGoods}}
		console.log(orderItem);

}
	return (
		<div className={styles.orderPage}>
			<ContentWrapper className={styles.orderPage__container}>
				<h1>Оформление заказа</h1>
				<h3>Корзина</h3>
				<CartItem className={styles.orderPage__cart}/>
				<OrderForm ref={formRef}  className={styles.orderPage__form}/>
				<div className={styles.orderPage__totalPrice}>
					Общая сумма: <span>{totalPrice}</span>{" "}
				</div>
				<Button className={styles.orderPage__checkout} onClick = {handleForm}>
					Оформить заказ
				</Button>
			</ContentWrapper>
		</div>
	);
};
