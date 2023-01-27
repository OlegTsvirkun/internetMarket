import React from "react";
import styles from "./Input.module.scss";

export const Input = ({
	type = "",
	name = "",
	value = "",
	containerClassName = "",
	className,
	placeholder = "",
	onChange = () => null,
	onClick = () => null,
	onInput = () => null,
	onBlur=()=>null,
	id,
	accept,
	multiple=false,
	autoComplete,
	labelTitle='',
	children
}) => {
	return (
		<label className={`${styles.container} ${containerClassName}`}>
			{labelTitle}
			<input
			autoComplete={autoComplete}
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
			{children}
		</label>
	);
};
