import React from "react";
import styles from "./Input.module.scss";

export const Input = ({
	type = "text",
	name = "",
	value = "",
	containerClassname = "",
	className,
	placeholder = "",
	onChange = () => null,
	onClick = () => null,
	onInput = () => null,
	id,
}) => {
	return (
		<div className={`${styles.container} ${containerClassname}`}>
			<input
				type={type}
				name={name}
				className={`${styles.input} ${className}`}
				placeholder={placeholder}
				onChange={onChange}
				onBlur={(e) => onBlur}
				value={value}
				onClick={() => onClick}
				id={id}
				onInput={onInput}
			/>
		</div>
	);
};
