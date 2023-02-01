import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { priceFormating } from "../../../utils/priceFormating";
import { useNavigate } from "react-router";
import { BsCart } from "react-icons/bs";
import styles from "./CartBlock.module.scss";
import { CartMenu } from "../CartMenu";
import { ItemsInCart } from "../ItemInCart/ItemInCart";
import { openCartMenu } from "../../../store/cartSlice";
import { ModalAlert } from "../../AdditionalComponents/ModalAlert/ModalAlert";
import { ORDER_ROUTE } from "../../../utils/constRoutes";

export const CartBlock = () => {
	const cart = useSelector((state) => state.cart.itemsInCart);

	const totalPrice = Object.keys(cart).reduce(
		(acc, item) => (acc += cart[item].price * cart[item].count),
		0,
	);
	const navigate = useNavigate();
	const isVisible = useSelector((state) => state.cart.isCartOpen);
	const dispatch = useDispatch();
	const cartBlock = useRef();

	const moveToOrder = () => {
		navigate(ORDER_ROUTE);
		dispatch(openCartMenu(false));
	};
	return (
		<div ref={cartBlock} className={styles.cartBlock}>
			<div className={styles.container}>
				<BsCart
					size={35}
					className={styles.icon}
					name="cart-block"
					onClick={() => dispatch(openCartMenu(!isVisible))}
				/>
				<ItemsInCart count={Object.keys(cart).length} />

				<span className={styles.totalPrice}>
					{totalPrice !== 0 ? priceFormating(totalPrice) : "0.00 "}
					&#8372;
				</span>
			</div>
			{isVisible && (
				<ModalAlert
					title="Кошик"
					bcgClick={() => dispatch(openCartMenu(false))}
					frstBtnTitle={
						!Object.keys(cart).length
							? "Вийти"
							: "Перейти до оформлення замовлення"
					}
					frstBtnClick={() =>
						!Object.keys(cart).length
							? dispatch(openCartMenu(!isVisible))
							: moveToOrder()
					}
					closeClick={() => dispatch(openCartMenu(!isVisible))}
				>
					<CartMenu totalPrice={totalPrice} cart={cart} />
				</ModalAlert>
			)}
			{/* {isVisible && <CartMenu totalPrice = {totalPrice} cart={cart} onClick={handleClick} />} */}
		</div>
	);
};
