import React from "react";
import styles from "./Button.module.scss";

export const Button = ({
	containerClassName = "",
	className = "",
	onClick = () => null,
	children = "",
	isBackButton = false,
}) => {
	return (
		<div className={containerClassName}>
			<button
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
