import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { priceFormating } from "../../../utils/priceFormating";
import { removeFromCart } from "../../../store/cartSlice";
import { CountChanger } from "../../CountChanger/CountChanger";
import styles from "./CartTableItem.module.scss";

export const CartTableItem = ({ index, articul, count, price }) => {
	const dispatch = useDispatch();
	const goods = useSelector((state) => state.cart.itemsInCart);

	const name = goods[articul]["name"];
	const picture = goods[articul]["picture"];
	const handlerRemove = () => {
		let obj = Object.keys(goods).reduce((acc, item) => {
			if (item !== articul) {
				acc[item] = goods[item];
			}
			return acc;
		}, {});
		dispatch(removeFromCart(obj));
	};
	return (
		<tbody className={styles.cartTable}>
			<tr>
				<th>{index}.</th>
				<th>
					<img src={process.env.REACT_APP_API_URL + picture} />
				</th>
				<th>{name}</th>
				<th>
					<CountChanger count={count} articul={articul} cart={goods} />{" "}
				</th>
				<th>
					{priceFormating(price * count)}
					&#8372;{" "}
				</th>
				<th className={styles.removeGood} onClick={handlerRemove}>
					&#10006;
				</th>
			</tr>
		</tbody>
	);
};
