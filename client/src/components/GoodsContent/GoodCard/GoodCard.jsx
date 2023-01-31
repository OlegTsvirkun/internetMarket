import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { priceFormating } from "../../../utils/priceFormating";
import { GoodBuy } from "../../GoodBuy";
import styles from "./GoodCard.module.scss";

export const GoodCard = (good) => {
	const { _id, articul, name, price,  picture } = good;
	// const { isLoading } = useSelector((state) => state.category);
	// if (isLoading) return <div>Loading...</div>;
	return (
		<div className={styles.goodCard}>
			<Link className={styles.link} to={`/good?id=${good._id}`}>
				<div className={styles.imageContainer}>
					{picture && (
						<img
							className={styles.image}
							src={process.env.REACT_APP_API_URL + picture}
							alt={name}
						/>
					)}
				</div>
				<div className={styles.articul}>АРТИКУЛ: {articul}</div>
				<p className={styles.name}>{name}</p>
			</Link>
			<div className={styles.buy}>
				<div className={styles.price}>
					{priceFormating(price)}{" "}
					<span className={styles.currency}>ГРН</span>
				</div>
				<GoodBuy good={good} />
			</div>
		</div>
	);
};
