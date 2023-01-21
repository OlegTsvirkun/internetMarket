import React from "react";
import { CartItem } from "../CartItem";
import { priceFormating } from "../../../utils/priceFormating";

import styles from "./CartMenu.module.scss";

export const CartMenu = ({ totalPrice, cart}) => {
	return (
			<div className={styles.cartMenu}>
				<div className={styles.goodList}>
					{Object.keys(cart).length > 0 ? <CartItem /> : "Кошик порожній"}
				</div>
				{Object.keys(cart).length > 0 ? (
					<div className={styles.arrange}>
						<div className={styles.totalPrice}>
							<span>Разом:</span>
							<span>
								{priceFormating(totalPrice)}
								&#8372;
							</span>
						</div>
					</div>
				) : null}
			</div>
		)
	
};
