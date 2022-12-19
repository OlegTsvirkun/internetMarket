import React from "react";
import { Button } from "../Button";
import styles from "./CountChanger.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { decrementGood, incrementGood, removeFromCart } from "../../store/cartSlice";

export const CountChanger = ({ count,articul }) => {
	const dispatch = useDispatch();
	const handleDecrement =()=> {
if(count>=1) dispatch(decrementGood(articul))
else dispatch(removeFromCart(articul))
	}
	return (
		<div className={styles.countChanger}>
				
			<Button className={styles.countChanger__button} onClick={() => dispatch(incrementGood(articul))} >+</Button>
			{count}
			<Button
				className={styles.countChanger__button}
				onClick={ handleDecrement}
			>
				-
			</Button>
		</div>
	);
};
