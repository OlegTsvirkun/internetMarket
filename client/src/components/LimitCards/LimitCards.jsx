import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./LimitCards.module.scss";

export const LimitCards = ({ value, setValue, total, setCurrentPage }) => {
	const navigate = useNavigate();
	const url = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		searchParams.set("limit", value);

		let skip = +searchParams.get("limit") * (+searchParams.get("page") - 1);
		if (skip > total)
			setCurrentPage(parseInt(total / +searchParams.get("limit")) + 1);
		navigate(url.pathname + "?" + searchParams.toString());
	}, [value]);

	return (
		<div className={styles.limitCards}>
			<div className={styles.limitCards__title}>Показувати по:</div>
			<div className={styles.limitCards__value}>
				<div
					className={styles.limitCards__arrow}
					onClick={() => (value < 12 ? setValue(+value + 3) : setValue(3))}
				>
					&#9650;
				</div>
			</div>
			<div className={styles.limitCards__valueItem}>{value} на сторінку</div>
			<div
				className={styles.limitCards__arrow}
				onClick={() => (value > 3 ? setValue(+value - 3) : setValue(3))}
			>
				&#9660;
			</div>
		</div>
	);
};
