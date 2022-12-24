import React, { useCallback, useRef,useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {  priceFormating } from "../../hooks";

import { useNavigate } from "react-router";
import { BsCart } from "react-icons/bs"; 

import styles from "./CartBlock.module.scss";
import { CartMenu } from "../CartMenu/";
import { ItemsInCart } from "../ItemInCart/ItemInCart";
import { openCartMenu } from "../../store/cartSlice";

export const CartBlock = () => {
	const cart = useSelector((state) => state.cart.itemsInCart);
	
    const totalPrice = Object.keys(cart).reduce((acc,item)=> acc+= cart[item].price*cart[item].count , 0)
	const navigate = useNavigate();
	const isVisible = useSelector((state) => state.cart.isCartOpen);
	const dispatch = useDispatch();
	const cartBlock = useRef();
	const isCartMounted = useRef(false)

	useEffect(() => {
		if(isCartMounted.current){
			let json = JSON.stringify(cart)
			localStorage.setItem('cart', json)
		}
		isCartMounted.current = true;
	
	}, [cart]);
	const handleClick = useCallback(() => {
		dispatch(openCartMenu(false));
		navigate("/order");
	}, [navigate]);

	const openMenu = useCallback(() => {
		dispatch(openCartMenu(!isVisible));
		const notMenu = (event) => {
			if (!event.path.includes(cartBlock.current)) {
				dispatch(openCartMenu(false));
				document.body.removeEventListener("click", notMenu);
			}
		};
		document.body.addEventListener("click", notMenu);
	}, [isVisible]);
	return (
		<div ref={cartBlock} className={styles.cartBlock}>
			<div className={styles.cartBlock__container}>
				<BsCart
					size={35}
					className={styles.cartBlock__icon}
					name="cart-block"
					onClick={openMenu}
				/>
				<ItemsInCart count={Object.keys(cart).length} />

				<span className={styles.cartBlock__totalPrice}>
					{totalPrice!==0 ? priceFormating(totalPrice): '0.00 '}
					&#8372;
				</span>
			</div>
			{isVisible && <CartMenu totalPrice = {totalPrice} cart={cart} onClick={handleClick} />}
		</div>
	);
};
