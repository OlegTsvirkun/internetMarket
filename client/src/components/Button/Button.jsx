import React from "react";
import styles from "./Button.module.scss";

export const Button = ({
	containerClassName = "",
	className = "",
	onClick = () => null,
	children = "",
	isBackButton = false,
	type
}) => {
	return (
		<div className={containerClassName}>
			<button
			type={type}
				className={`${
					isBackButton ?styles.backButton : styles.button
				} ${className}`}
				onClick={onClick}
			>
				{children}
				
			</button>
		</div>
	);
};
