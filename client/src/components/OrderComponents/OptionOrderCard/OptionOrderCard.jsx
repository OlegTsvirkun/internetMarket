import React, { useState } from "react";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
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
				className={`${checked?styles.container + ' ' +styles.activeCard:styles.container}`}
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
							className={`${styles.check} ${styles.active}`}
							style={{ backgroundColor: "transparent" }}
							size="30"
						/>
					) : (
						<AiOutlineCheckCircle
							className={styles.check}
							size="30"
						/>
					)}
				</span>
				<h4> {title}</h4>
				<div className={styles.deliveryPrice}>
					{subtitle}
					<p>{deliveryPrice} грн.</p>
				</div>
				<div className={styles.icon}> {icon}</div>
			</label>
		</div>
	);
};
