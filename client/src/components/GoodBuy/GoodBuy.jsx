import React from "react";
import { setInCart, removeFromCart } from "../../store/cartSlice";
import { Button } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import styles from "./GoodBuy.module.scss";

export const GoodBuy = ({ good }) => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.itemsInCart);
	const isItemImBasket = cart.some((item) => {
		return item.articul === good.articul;
	});

	const handleButton = (event) => {
		event.stopPropagation();
		if (isItemImBasket) {
			dispatch(removeFromCart(good.articul));
		} else dispatch(setInCart(good));
	};

	return (
		<div className={styles.goodBuy}>
			<Button
				className={`
        ${
					isItemImBasket ? styles.goodBuy__buttonInCart : styles.goodBuy__button
				}`}
				// type={isItemImBasket ? "secondary" : "primary"}
				onClick={handleButton}
			>
				{isItemImBasket ? "Убрать из корзины" : "В корзину"}
			</Button>
		</div>
	);
};
