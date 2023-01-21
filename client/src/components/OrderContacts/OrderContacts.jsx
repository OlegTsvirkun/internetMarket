import React, { useEffect, useState } from "react";
import { Button } from "../Button";
import { Link } from "react-router-dom";

import styles from "./OrderContacts.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addError, addField, remooveError } from "../../store/orderSlice";
import { valueValidator } from "../../utils/validator";
import { Tooltip } from "../Tooltip/Tooltip";
import { Input } from "../Input/Input";

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

	const blurHandler = (
		e,
		onlyText = true,
		minValue = 3,
		maxValue = 40,
		empty = false,
	) => {
		let obj = {};
		obj = valueValidator(e, onlyText, minValue, maxValue, empty);
		if (Object.keys(obj)[0]) {
			dispatch(addError({ [e.target.name]: true }));
		} else {
			dispatch(remooveError({ [e.target.name]: false }));
		}

		return obj;
	};

	return (
		<div className={styles.orderContacts}>
			<h3>Заповніть Ваші контактні дані</h3>{" "}
			<div className={styles.contacts}>
					<Input
						type="text"
						name="firstname"
						labelTitle="Ваше прізвище"
						placeholder="Прізвище"
						onChange={(e) => {
							setFirstName(e.target.value);
						}}
						value={firstName}
						onBlur={(e) => setFirstNameError(blurHandler(e))}
						onInput={(e) => setFirstNameError(blurHandler(e))}
					>
					{Object.keys(firstNameError)[0] && (
						<Tooltip
							error={Object.keys(firstNameError)[0]}
							className={"right"}
						/>
						)}
						</Input>
					<Input
						type="text"
						name="name"
						labelTitle="Ваше ім'я"
						placeholder="Ім'я"
						onChange={(e) => {
							setName(e.target.value);
						}}
						value={name}
						onBlur={(e) => setNameError(blurHandler(e))}
						onInput={(e) => setNameError(blurHandler(e))}
					>
					{Object.keys(nameError)[0] && (
						<Tooltip error={Object.keys(nameError)[0]} className={"right"} />
					)}
					</Input>
					<Input
						type="tel"
						name="tel"
						placeholder="Телефон"
						labelTitle="Ваш телефон"
						onChange={(e) => {
							setTel(e.target.value);
						}}
						value={tel}
						onBlur={(e) => setTelError(blurHandler(e))}
						onInput={(e) => setTelError(blurHandler(e))}
					>
					{
						Object.keys(telError)[0] && (
							<Tooltip error={Object.keys(telError)[0]} className={"right"} />
						)
					}
					</Input>
					<Input
						type="email"
						name="email"
						placeholder="example@mail.com"
						labelTitle="Ваш email"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						value={email}
						onBlur={(e) => setEmailError(blurHandler(e))}
						onInput={(e) => setEmailError(blurHandler(e))}
					>
					{
						Object.keys(emailError)[0] && (
							<Tooltip error={Object.keys(emailError)[0]} className={"right"} />
						)
					}
					</Input>
			</div>
		</div>
	);
};
