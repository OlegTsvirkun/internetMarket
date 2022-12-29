import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import { Link } from "react-router-dom";

import styles from "./OrderContacts.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addError, addField, remooveError } from "../../store/orderSlice";
import { Validator } from "../../utils/validator";
import { Tooltip } from "../Tooltip/Tooltip";

export const OrderContacts = ({}) => {
	const [firstName, setFirstName] = useState("");
	const [name, setName] = useState("");
	const [tel, setTel] = useState("");
	const [email, setEmail] = useState("");

	const [firstNameError, setFirstNameError] = useState({});
	const [nameError, setNameError] = useState({});
	const [telError, setTelError] = useState({});
	const [emailError, setEmailError] = useState({});

	const dispatch = useDispatch();

	const blurHandler = (e, maxValue = 40, minValue = 3) => {
		let obj = {};
		if (e.target.value.length < 1) {
			obj = { ["Поле не може бути порожнім"]: true };
		} else if (e.target.value.length < minValue) {
			obj = { [`Поле має бути більше ${minValue} символів`]: true };
		} else if (e.target.value.length > maxValue) {
			obj = { [`Поле має бути не більше ${maxValue} символів`]: true };
		} else if (Validator(e)) {
			obj = { [Validator(e)]: true };
		} else {
			obj = {};
		}
		if (Object.keys(obj)[0]) {
			dispatch(addError({ [e.target.name]: true }));
		} else {
			dispatch(remooveError({ [e.target.name]: false }));
			// dispatch(addField({ [e.target.name]: e.target.value }))
		}

		return obj;
	};

	return (
		<div className={styles.orderContacts}>
<h3>Заповніть Ваші контактні дані</h3>			<div className={styles.orderContacts__contacts}>
				<label>
					Прізвище
					<input
						type="text"
						name="firstname"
						data-caption = "Прізвище"


						placeholder="Прізвище"
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
						value={firstName}
						onBlur={(e) => setFirstNameError(blurHandler(e))}
						onInput={(e) => setFirstNameError(blurHandler(e))}
					/>
					{Object.keys(firstNameError)[0] && (
						<Tooltip
							error={Object.keys(firstNameError)[0]}
							className={"right"}
						/>
					)}
				</label>
				<label>
					Ім'я
					<input
						type="text"
						name="name"
						data-caption = "Ім'я"

						placeholder="Ім'я"
						onChange={(e) => {
							setName(e.target.value);
						}}
						value={name}
						onBlur={(e) => setNameError(blurHandler(e))}
						onInput={(e) => setNameError(blurHandler(e))}
					/>
					{Object.keys(nameError)[0] && (
						<Tooltip error={Object.keys(nameError)[0]} className={"right"} />
					)}
				</label>

				<label>
					Телефон
					<input
						type="tel"
						name="tel"
						placeholder="Телефон"
						data-caption = "Телефон"

						onChange={(e) => {
							setTel(e.target.value);
						}}
						value={tel}
						onBlur={(e) => setTelError(blurHandler(e))}
						onInput={(e) => setTelError(blurHandler(e))}
					/>
					{
						Object.keys(telError)[0] && (
							<Tooltip error={Object.keys(telError)[0]} className={"right"} />
						)

						// <div className={styles.error}>{Object.keys(telError)[0]}</div>
					}
				</label>

				<label>
					Ваш email
					<input
						type="email"
						name="email"
						placeholder="example@mail.com"
						data-caption = "email"

						onChange={(e) => {
							setEmail(e.target.value);
						}}
						value={email}
						onBlur={(e) => setEmailError(blurHandler(e))}
						onInput={(e) => setEmailError(blurHandler(e))}
					/>
					{
						Object.keys(emailError)[0] && (
							<Tooltip error={Object.keys(emailError)[0]} className={"right"} />
						)

						// <div className={styles.error}>{Object.keys(emailError)[0]}</div>
					}
				</label>

				{/* <h2>{inputError}</h2> */}
			</div>
		</div>
	);
};
