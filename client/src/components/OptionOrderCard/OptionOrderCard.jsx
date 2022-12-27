import React, { useState } from "react";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { ContentWrapper } from "../ContentWrapper";
import styles from "./OptionOrderCard.module.scss";

export const OptionOrderCard = ({
	id,
	name,
	title,
	subtitle,
	onClick,
	icon,
	checked,
	deliveryPrice,
	value
}) => {
	// const [isChecked, setIsChecked] = useState(checked);

	return (
		<div
			className={`${
				checked
					? styles.optionOrderCard + " " + styles.active
					: styles.optionOrderCard
			}`}
		>
			<label
				htmlFor={id}
				className={`${checked?styles.optionOrderCard__container + ' ' +styles.activeCard:styles.optionOrderCard__container}`}
				onClick = {onClick}
			>
				<span>
					<input
						id={id}
						type="radio"
						name={name}
						checked={checked}
						value={value}
						onChange={onClick}
					/>

					{checked ? (
						<AiFillCheckCircle
							className={`${styles.optionOrderCard__check} ${styles.active}`}
							style={{ backgroundColor: "transparent" }}
							size="30"
						/>
					) : (
						<AiOutlineCheckCircle
							className={styles.optionOrderCard__check}
							size="30"
						/>
					)}
				</span>
				<h4> {title}</h4>
				<div className={styles.optionOrderCard__deliveryPrice}>
					{subtitle}
					<p>{deliveryPrice}</p>
				</div>
				<div className={styles.optionOrderCard__icon}> {icon}</div>
			</label>
		</div>
	);
};
