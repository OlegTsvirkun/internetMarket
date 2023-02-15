import React from "react";
import { setInCart, removeFromCart } from "../../store/slices/cartSlice";
import { Button } from "../UA_Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import styles from "./GoodBuy.module.scss";

export const GoodBuy = ({ good }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.itemsInCart);
	const isItemImBasket =Object.keys(cart).some((item) => {
		return item === good.articul
	});
	
	const handleButton = (event) => {
		event.stopPropagation();
		let count = 0;
		if (isItemImBasket) {
			
		let objRemoved = Object.keys(cart).reduce((acc,item) =>{
			if (item !== good.articul){
			acc[item]= cart[item]
		  }
		  return acc
		},{});
		dispatch(removeFromCart(objRemoved))
		} else {
			count++;
		const obj = {}
		obj[good.articul] = {...good,'count':count , 'price': good.price}
		console.log(obj);
			dispatch(setInCart({...obj}));
		}
	};

	return (
		<div className={styles.goodBuy}>
			{isItemImBasket ?<Button  containerClassName={styles.goodBuyButtonCont} className={styles.goodBuyButton} isOrangeButton={true} 	onClick={handleButton} >
				Прибрати з кошика
			</Button >:
			<Button containerClassName={styles.goodBuyButtonCont} className={styles.goodBuyButton} onClick={handleButton} >
В кошик
</Button>
			}
			
			
		</div>
	);
};
