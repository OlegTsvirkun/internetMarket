import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link} from'react-router-dom'
import { CartItem } from "../CartItem";
import { Button } from "../Button";
import { BsX } from "react-icons/bs";
import { priceFormating } from "../../hooks";

import styles from "./CartMenu.module.scss";
import { openCartMenu } from "../../store/cartSlice";

export const CartMenu = ({ totalPrice, cart, onClick }) => {
	const isVisible = useSelector((state) => state.cart.isCartOpen);
	const dispatch = useDispatch();

	return (
		isVisible && (
			<div className={styles.cartMenu}>
				<div className={styles.cartMenu__topBar}>
					<span>Корзина</span>
					{
						<BsX
							className={styles.cartMenu__close}
							size="25"
							onClick={() => dispatch(openCartMenu(!isVisible))}
						/>
					}
				</div>
				<div className={styles.cartMenu__goodList}>
					{Object.keys(cart).length > 0 ? <CartItem /> : "Корзина пуста"}
				</div>
				{Object.keys(cart).length > 0 ? (
					<div className={styles.cartMenu__arrange}>
						<div className={styles.cartMenu__totalPrice}>
							<span>Итого:</span>
							<span>
								{priceFormating(totalPrice)}
								&#8372;
							</span>
						</div>
						<Button onClick={onClick}><Link to ='/order'>Оформить заказ</Link></Button>
					</div>
				) : null}
			</div>
		)
	);
};
