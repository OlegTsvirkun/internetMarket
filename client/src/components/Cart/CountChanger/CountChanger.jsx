import React from "react";
import { Button } from "../../UA_Components/Button/Button";
import styles from "./CountChanger.module.scss";
import {  useDispatch } from "react-redux";
import {
	decrementGood,
	incrementGood,
	removeFromCart,
} from "../../../store/cartSlice";

export const CountChanger = ({ count, articul, cart }) => {
	const dispatch = useDispatch();
	const isItemImBasket = Object.keys(cart).some((item) => {
		return item === articul;
	});
	const handleDecrement = () => {
		if (count >= 1) dispatch(decrementGood(articul));
		else {
			if (isItemImBasket) {
				let objRemoved = Object.keys(cart).reduce((acc, item) => {
					if (item !== articul) {
						acc[item] = cart[item];
					}
					return acc;
				}, {});
				dispatch(removeFromCart(objRemoved));
			}
		}
	};
	return (
		<div className={styles.countChanger}>
			<Button
				className={styles.button}
				onClick={() => dispatch(incrementGood(articul))}
			>
				+
			</Button>
			{count}
			<Button className={styles.button} onClick={handleDecrement}>
				-
			</Button>
		</div>
	);
};
