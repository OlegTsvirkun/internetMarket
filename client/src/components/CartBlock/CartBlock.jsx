import React, { useCallback, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { calcTotalPrice, priceFormating } from "../../hooks";

import { useNavigate } from "react-router";
import { BsCart } from "react-icons/bs";

import styles from "./CartBlock.module.scss";
import { CartMenu } from "../CartMenu/";
import { ItemsInCart } from "../ItemInCart/ItemInCart";
import { openCartMenu } from "../../store/cartSlice";

export const CartBlock = () => {
	const cart = useSelector((state) => state.cart.itemsInCart);
	const totalPrice = calcTotalPrice(cart);
	const navigate = useNavigate();
	const isVisible = useSelector(state=>state.cart.isCartOpen)
	const dispatch = useDispatch();
	const cartBlock = useRef();

	const handleClick = useCallback(() => {
		dispatch(openCartMenu(false));
		navigate("/order");
	  }, [navigate]);

	const openMenu = useCallback(
		() => {
			  dispatch(openCartMenu(!isVisible))
			  const notMenu=(event)=>{
			    if(!event.path.includes(cartBlock.current)){
			      dispatch(openCartMenu(false))
			      document.body.removeEventListener('click',notMenu)
			    }
			  }
			  document.body.addEventListener('click',notMenu)
		},
		[isVisible]
	);
	return (
		<div ref={cartBlock} className={styles.cartBlock}>
			<BsCart
				size={35}
				className={styles.cartBlock__icon}
				name="cart-block"

				onClick={
				openMenu
			
				}
			/>
			<ItemsInCart count={cart.length} />
			{totalPrice !== 0 ? (
        <span className={styles.cartBlock__totalPrice}>{priceFormating(totalPrice)} &#8372;</span>
      ) : null}
			{
				  isVisible &&
				<CartMenu
				 cart={cart}
				 onClick={handleClick}
				/>
			}
		</div>
	);
};
