import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./LimitCards.module.scss";
 
export const LimitCards = ({ cardsLimit = 3, setCardsLimit, total, setCurrentPage }) => {
	const navigate = useNavigate();
	const url = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();
	let totalPages = Math.ceil(total / cardsLimit);
	// console.log(total);
	useEffect(() => {
		searchParams.set("limit", cardsLimit);

		let skip = +searchParams.get("limit") * (+searchParams.get("page") - 1);
		if (skip > total)
			setCurrentPage(parseInt(total / +searchParams.get("limit")) + 1);
		// navigate(url.pathname + "?" + searchParams.toString());
	}, [cardsLimit]);

	return (
		<div className={styles.limitCards}>
			<div className={styles.title}>Показувати по:</div>
			<div className={styles.value}>
				<div
					className={styles.arrow}
					onClick={() => (cardsLimit < 12 ? setCardsLimit(+cardsLimit + 3) : setCardsLimit(3))}
				>
					&#9650;
				</div>
			</div>
			<div className={styles.valueItem}>{cardsLimit} на сторінку</div>
			<div
				className={styles.arrow}
				onClick={() => (cardsLimit > 3 ? setCardsLimit(+cardsLimit - 3) : setCardsLimit(3))}
			>
				&#9660;
			</div>
		</div>
	);
};
