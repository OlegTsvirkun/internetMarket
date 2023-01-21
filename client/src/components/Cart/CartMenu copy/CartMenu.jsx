import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {Link} from'react-router-dom'
import { CartItem } from "../CartItem";
import { Button } from "../../Button";
import { BsX } from "react-icons/bs";
import { priceFormating } from "../../../utils/priceFormating";

import styles from "./CartMenu.module.scss";
import { openCartMenu } from "../../../store/cartSlice";

export const CartMenu = ({ totalPrice, cart, onClick }) => {
	const isVisible = useSelector((state) => state.cart.isCartOpen);
	const dispatch = useDispatch();

	return (
		!isVisible && (
			<div className={styles.cartMenu}>
				<div className={styles.cartMenu__topBar}>
					<span>Кошик</span>
					{
						<BsX
							className={styles.cartMenu__close}
							size="25"
							onClick={() => dispatch(openCartMenu(!isVisible))}
						/>
					}
				</div>
				<div className={styles.cartMenu__goodList}>
					{Object.keys(cart).length > 0 ? <CartItem /> : "Кошик порожній"}
				</div>
				{Object.keys(cart).length > 0 ? (
					<div className={styles.cartMenu__arrange}>
						<div className={styles.cartMenu__totalPrice}>
							<span>Разом:</span>
							<span>
								{priceFormating(totalPrice)}
								&#8372;
							</span>
						</div>
						<Button onClick={onClick} className={styles.cartMenu__button} ><Link to ='/order'>Перейти до оформлення замовлення</Link></Button>
					</div>
				) : null}
			</div>
		)
	);
};
