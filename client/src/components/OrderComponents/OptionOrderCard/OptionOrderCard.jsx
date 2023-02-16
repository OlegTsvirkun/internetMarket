import React, { useState } from "react";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import styles from "./OptionOrderCard.module.scss";

export const OptionOrderCard = ({
	id = "",
	name = "",
	title = "",
	subtitle = "",
	onClick,
	icon = null,
	checked = "",
	deliveryPrice = "",
	value = "",
	children,
	className = "",
	iconClassName='',
	titleClassName='',
	subtitleClassName='',
	containerClassName = "",
	borderColor = "",
	checkedColor = "",
}) => {
	return (
		<div
			style={{
				backgroundColor: `${checked ? checkedColor:''}`,
				borderColor: `${borderColor && borderColor}`,
			}}
			className={`${
				checked
					? styles.optionOrderCard +" " +styles.active +" " + containerClassName
					: styles.optionOrderCard + " " + containerClassName
			}`}
		>
			<label
				htmlFor={id}
				className={`${
					checked
						? styles.container + " " + styles.activeCard + " " + className
						: styles.container + " " + className
				}`}
				onClick={onClick}
			>
				<span className={styles.checkIcon}>
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
							style={{
								backgroundColor: "transparent",
								color: `${checked && borderColor}`,
							}}
							size="30"
						/>
					) : (
						<AiOutlineCheckCircle
							className={styles.check}
							size="30"
							style={{ color: `${borderColor && borderColor}` }}
						/>
					)}
				</span>
				{title && <h4 className={`${styles.title} ${titleClassName}`}> {title}</h4>}
				<div className={`${styles.deliveryPrice} ${subtitleClassName}`}>
					{deliveryPrice && (
						<>
							{subtitle}
							<p>{deliveryPrice} грн.</p>
						</>
					)}
					{children}
				</div>
				{icon && <div className={`${styles.icon} ${iconClassName}`}> {icon}</div>}
			</label>
		</div>
	);
};
