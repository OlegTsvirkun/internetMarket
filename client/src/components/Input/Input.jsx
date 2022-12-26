import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import styles from "./Input.module.scss";

export const Input = ({
	type = "text",
	name = "",
	value='',
	require = false,
	containerClassname = "",
  className,
	placeholder = "",
	onChange = () => null,
	error = "",
	errShow,
	setErrShow ,

	setIsError,
	charNumberMin = 3,
	charNumberMax = 9,
  id,
}) => {
	const inputRef = useRef()
	const [inputError, setInputError] = useState("Поле не может быть пустым");
	const [inputDirty, setInputDirty] = useState(true);

useEffect(() => {
	inputDirty ? setIsError([{[name]: inputDirty}]):setIsError([])
}, [inputDirty,inputError,value]);

	const Validator = (e) => {
		// setFirstName(e.target.value);
		let value = e?.target?.value || ' ';
		switch (e?.target?.type || ' ') {
			case "text":
				let reText = /^[a-zA-ZА-Яа-я]+$/;
				if (!reText.test(String(value).toLowerCase().trim())) {
					return "Поле должно содержать только буквы";
				} else {
					return false;
				}
			//  break
			case "email":
				let reEmail =
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if (!reEmail.test(String(value).toLowerCase().trim())) {
					return "Некорректный e-mail";
				} else {
					return false;
				}
			case "tel":
				let reTel = /^\+?([0-9]{12})$/;
				if (!reTel.test(String(value).trim())) {
					return "Некорректный телефон, должен быть  в формате: +380123456789";
				} else {
					return false;
				}
			case "number":
				let reNum = /[0-9]/;
				if (!reNum.test(String(value).trim())) {
					return "Только цифры";
				} else {
					return false;
				}
			default:
				return false;
		}
	};

	const blurHandler =(e) => {
		if (require && e.target.value.length < 1) {
			console.log(value);
			setInputDirty(true);
			setInputError("Поле не может быть пустым");
		} else if (e.target.value.length < charNumberMin) {
			setInputDirty(true);
			setInputError(`Поле должно быть больше ${charNumberMin} символов`);
		} else if (e.target.value.length > charNumberMax) {
			setInputDirty(true);
			setInputError(`Поле должно быть не больше ${charNumberMax} символов`);
		} else if (Validator(e)) {
			setInputDirty(true);
			setInputError(Validator(e));
		} else {
			setInputDirty(false)
			setInputError('1')
		};
		const notTooltip = (event) => {
			if (event.path.includes(e.target)) {
				setInputDirty(false)
				// setErrShow(false);
				document.body.removeEventListener("click", notTooltip);
			}
		};
		document.body.addEventListener("click", notTooltip);

	}

	return (
		<div className={`${styles.container} ${containerClassname}`}>
			{( errShow && inputDirty ) &&
				<div className={styles.error}>{inputError}</div>
			}

			{/* {isError && <div style={{ color: "red" }}>{isError}</div>} */}
			<input
			// ref = {inputRef}
				type={type}
				name={name}
				className={`${styles.input} ${className}`}
				placeholder={placeholder}
				onChange={onChange}
				onBlur={(e) => blurHandler(e)}
				value={value}
				onClick={()=>setInputDirty(false)}
				id={id}
				onInput={(e) =>{ 
					blurHandler(e)
		// setErrShow(false)
		console.log(inputError);

				}}
			/>
			{/* {error && <span className={styles.error}>{error}</span>} */}
		</div>
	);
};
