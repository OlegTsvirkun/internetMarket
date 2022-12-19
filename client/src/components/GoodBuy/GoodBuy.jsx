import React from "react";
import { setInCart, removeFromCart, setItemsGoods } from "../../store/cartSlice";
import { Button } from "../Button";
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
			dispatch(removeFromCart(good.articul));
		} else {
			count++;
		const obj = {}
		obj[good.articul]= count
			dispatch(setInCart({...obj}));
		}
	};

	return (
		<div className={styles.goodBuy}>
			<Button
				className={`
        ${
					isItemImBasket ? styles.goodBuy__buttonInCart : styles.goodBuy__button
				}`}
				onClick={handleButton}
			>
				{isItemImBasket ? "Убрать из корзины" : "В корзину"}
			</Button>
		</div>
	);
};
