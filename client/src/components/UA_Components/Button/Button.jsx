import React from "react";
import styles from "./Button.module.scss";

export const Button = ({
	containerClassName = "",
	className = "",
	onClick = () => null,
	children = "",
	isBackButton = false,
	isOrangeButton = false,
	isDisableButton=false,
	isAlertButton=false,
	isBlueButton = true,

	// isHover=true,
	type,
}) => {
	if (isBackButton || isOrangeButton||isDisableButton ||isAlertButton) isBlueButton = false;
	return (
		<div className={containerClassName}>
			<button
				type={type}
				className={`${styles.button} 
				${isBackButton ? styles.backButton : ''} 
				${isBlueButton ? styles.blueButton : ''} 
				${isOrangeButton ? styles.orangeButton : ''} 
				${isDisableButton ? styles.disableButton : ''} 
				${isAlertButton ? styles.alertButton : ''} 
				${className}
				`}
				onClick={!isDisableButton?onClick:null}
			>
				{children}
			</button>
		</div>
	);
};
