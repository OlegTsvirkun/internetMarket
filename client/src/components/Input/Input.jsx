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
	onBlur=()=>null,
	id,
	accept,
	multiple=false
}) => {
	return (
		<div className={`${styles.container} ${containerClassname}`}>
			<input
				type={type}
				name={name}
				className={`${styles.input} ${className}`}
				placeholder={placeholder}
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				onClick={onClick}
				id={id}
				onInput={onInput}
				multiple={multiple}
				accept={accept}
			/>
		</div>
	);
};
