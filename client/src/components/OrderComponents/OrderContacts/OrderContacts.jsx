import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addError,
	addOrderUserData,
	removeError,
} from "../../../store/slices/orderSlice";
import { regEmail, regTel, regText } from "../../../utils/constValidPatterns";
import { useForm } from "react-hook-form";
import { getUserInfo } from "../../../store/slices/userSlice";
import userServices from "../../../store/services/userService";
import { useDebounce } from "../../../hooks/useDebounce";
import styles from "./OrderContacts.module.scss";

export const OrderContacts = ({ className }) => {
	const { isAuth, email, info } = useSelector((state) => state.user);
	const [isUserReg, setisUserReg] = useState(false);
	const {
		register,
		watch,
		setValue,
		getValues,
		setError,
		setFocus,

		formState: { errors, isValid, isValidating },
	} = useForm({ mode: "all", criteriaMode: "all" });

	const dispatch = useDispatch();

	useEffect(() => {
		if (isAuth) dispatch(getUserInfo());
	}, [isAuth]);
	useEffect(() => {
		if (isAuth) {
			setValue("email", email || "");
			setValue("firstname", info?.firstname || "");
			setValue("name", info?.name || "");
			setValue("tel", info?.tel || "");
			setFocus("firstname");
		}

		return () => {};
	}, [info, email, isAuth]);

	useEffect(() => {
		if (!Object.keys(errors)[0] && !isValidating && isValid) {
			dispatch(addOrderUserData(watch()));
			dispatch(removeError("user"));
		} else if (isUserReg) dispatch(addError({ user: true }));
		else dispatch(addError({ user: true }));
		return () => {
			const subscription = watch((data) => data);
			subscription.unsubscribe();
			dispatch(removeError("user"));
		};
	}, [isValidating, setValue, watch, errors, isUserReg]);

	const debounceEmail = useDebounce(getValues("email"), 1200);

	const onChange = useMemo(async () => {
		if (errors?.email?.type || isAuth) return;
		else {
			await userServices
				.isUserRegistered(debounceEmail)
				.then((res) => {
					if (res.isUserRegistered == true) {
						setisUserReg(true);
						setError("email", {
							types: "custom",
							message: res?.message,
						});
					} else setisUserReg(false);
				})
				.catch((err) => console.log(err));
		}
	}, [debounceEmail, isAuth]);
	
	const onBlur = async (e) => {
		if (errors?.email?.type || isAuth) return;
		else {
			await userServices
				.isUserRegistered(e.target.value)
				.then((res) => {
					if (res.isUserRegistered == true) {
						setisUserReg(true);
						setError("email", {
							types: "custom",
							message: res?.message,
						});
					} else setisUserReg(false);
				})
				.catch((err) => console.log(err));
		}
	};
	return (
		<div className={`${styles.orderContacts} ${className}`}>
			<h3 className={styles.title}>Заповніть Ваші контактні дані </h3>{" "}
			<div className={styles.contacts}>
				<label>
					Прізвище{" "}
					<span
						style={{
							color: "red",
						}}
					>
						*
					</span>
					<input
						style={{
							border: `${errors?.firstname ? "solid 1px red" : ""}`,
						}}
						{...register("firstname", {
							required: "Треба заповнити поле",
							pattern: {
								value: regText,
								message: "Поле має містити лише літери",
							},
							minLength: {
								value: 3,
								message: "Назва повинна бути не менше 3 символів",
							},
							maxLength: {
								value: 50,
								message: "Назва повинна бути не більше 50 символів",
							},
						})}
						placeholder="Прізвище"
					/>
				</label>
				<p className={styles.error}>
					{errors?.firstname ? errors?.firstname?.message || "Error" : ""}
				</p>
				<label>
					Ім'я{" "}
					<span
						style={{
							color: "red",
						}}
					>
						*
					</span>
					<input
						style={{
							border: `${errors?.name ? "solid 1px red" : ""}`,
						}}
						placeholder="Ім'я"
						{...register("name", {
							pattern: {
								value: regText,
								message: "Поле має містити лише літери",
							},
							required: "Треба заповнити поле",
							minLength: {
								value: 3,
								message: "Назва повинна бути не менше 3 символів",
							},
							maxLength: {
								value: 50,
								message: "Назва повинна бути не більше 50 символів",
							},
						})}
					/>
				</label>
				<p className={styles.error}>
					{errors?.name ? errors?.name?.message || "Error" : ""}
				</p>
				<label>
					Телефон{" "}
					<span
						style={{
							color: "red",
						}}
					>
						*
					</span>
					<input
						style={{
							border: `${errors?.tel ? "solid 1px red" : ""}`,
						}}
						type="tel"
						placeholder="Телефон"
						{...register("tel", {
							// onBlur:(e)=>{ !isAuth && isUserRegistered(e)},
							pattern: {
								value: regTel,
								message: "Введіть телефон у фоматі: +380123456789",
							},
							required: "Треба заповнити поле",
						})}
					/>
				</label>
				<p className={styles.error}>
					{errors?.tel ? errors?.tel?.message : ""}
				</p>
				<label>
					email{" "}
					<span
						style={{
							color: "red",
						}}
					>
						*
					</span>
					<input
						style={{
							border: `${errors?.email ? "solid 1px red" : ""}`,
						}}
						type="email"
						placeholder="example@mail.com"
						{...register("email", {
							onBlur: (e) => {
								isAuth ? onBlur(e) : null;
							},
							onChange: () => {
								!isAuth ? onChange : null;
							},
							pattern: {
								value: regEmail,
								message: "Некоректний e-mail",
							},
							required: "Треба заповнити поле",
							minLength: {
								value: 5,
								message: "Назва повинна бути не менше 3 символів",
							},
							maxLength: {
								value: 50,
								message: "Назва повинна бути не більше 50 символів",
							},
						})}
					/>
				</label>
				<p className={styles.error}>{errors?.email?.message}</p>
			</div>
		</div>
	);
};
