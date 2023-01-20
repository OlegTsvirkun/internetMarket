import React from "react";
import styles from "./Button.module.scss";

export const Button = ({
	containerClassName = "",
	className = "",
	onClick = () => null,
	children = "",
	isBackButton = false,
	// isHover=true,
	type
}) => {
	return (
		<div className={containerClassName}>
			<button
			type={type}
				className={`${
					isBackButton ?styles.backButton : styles.button
				} ${className}
				`}
				// ${isHover ? styles.buttonHover: null}
				onClick={onClick}
			>
				{children}
				
			</button>
		</div>
	);
};
