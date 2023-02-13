import React, { useEffect } from "react";
import styles from "./DeliveryAdress.module.scss";
import { useDispatch } from "react-redux";
import {
	addError,
	addOrderDeliveryData,
	deleteOrderDeliveryData,
	removeError,
} from "../../../store/orderSlice";
import { useForm } from "react-hook-form";
import { regNum, regText } from "../../../utils/constValidPatterns";

export const DeliveryAdress = ({}) => {
	const {
		register,
		watch,
		formState: { errors, isValid, isValidating },
	} = useForm({ mode: "all" });

	const dispatch = useDispatch();

	useEffect(() => {
		if (isValid && !isValidating) {
			dispatch(addOrderDeliveryData(watch()));
			dispatch(removeError("deliveryAdress"));
		} else {
			dispatch(addError({ deliveryAdress: true }));
		}
		return () => {
			const subscription = watch((data) => data);
			subscription.unsubscribe();
			dispatch(removeError("deliveryAdress"));
			// dispatch(deleteOrderDeliveryData());
			
		};
	}, [isValidating]);

	return (
		<div className={styles.deliveryAdress}>
			<div className={styles.city}>
				<label className={styles.containerInp}>
					Ваше Місто
					<span
						style={{
							color: "red",
						}}
					>
						*
					</span>
					<input
						type="text"
						placeholder="Місто"
						style={{
							border: `${errors?.city ? "solid 1px red" : ""}`,
						}}
						{...register("city", {
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
					/>
				</label>
				<p className={styles.error}>
					{errors?.city ? errors?.city?.message || "Error" : ""}
				</p>

				<label className={styles.containerInp}>
					Вулиця
					<span
						style={{
							color: "red",
						}}
					>
						*
					</span>
					<input
						type="text"
						placeholder="Вулиця"
						style={{
							border: `${errors?.street ? "solid 1px red" : ""}`,
						}}
						{...register("street", {
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
					/>
				</label>
				<p className={styles.error}>
					{errors?.street ? errors?.street?.message || "Error" : ""}
				</p>
			</div>
			<div className={styles.address}>
				<label className={styles.addressInput}>
					Дім{" "}
					<span
						style={{
							color: "red",
						}}
					>
						*
					</span>
					<input
						type="number"
						name="house"
						style={{
							border: `${errors?.house ? "solid 1px red" : ""}`,
						}}
						{...register("house", {
							required: "Треба заповнити поле",
							pattern: {
								value: regNum,
								message: "Поле має містити лише числа",
							},
							minLength: {
								value: 1,
								message: "Назва повинна бути не менше 1 символів",
							},
							maxLength: {
								value: 3,
								message: "Назва повинна бути не більше 3 символів",
							},
						})}
					/>
				</label>

				<label className={styles.addressInput}>
					Літера
					<input
						type="text"
						style={{
							border: `${errors?.litHouse ? "solid 1px red" : ""}`,
						}}
						{...register("litHouse", {
							pattern: {
								value: regText,
								message: "Поле має містити лише літери",
							},
							minLength: {
								value: 1,
								message: "Назва повинна бути не менше  символів",
							},
							maxLength: {
								value: 1,
								message: "Назва повинна бути не більше 1 символів",
							},
						})}
					/>
				</label>

				<label className={styles.addressInput}>
					Квартира
					<input
						type="number"
						name="appartment"
						placeholder=""
						style={{
							border: `${errors?.appartment ? "solid 1px red" : ""}`,
						}}
						{...register("appartment", {
							pattern: {
								value: regNum,
								message: "Поле має містити лише числа",
							},
							minLength: {
								value: 1,
								message: "Назва повинна бути не менше 1 символів",
							},
							maxLength: {
								value: 4,
								message: "Назва повинна бути не більше 4 символів",
							},
						})}
					/>
				</label>
			</div>
			<p className={styles.error}>
				{errors?.appartment || errors?.litHouse || errors?.house
					? errors?.appartment?.message ||
					  errors?.litHouse?.message ||
					  errors?.house?.message
					: ""}
			</p>
		</div>
	);
};
