import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	addError,
	addOrderDeliveryData,
	deleteOrderDeliveryData,
	removeError,
} from "../../../store/slices/orderSlice";

import styles from "./DeliveryPost.module.scss";
import { useForm } from "react-hook-form";
import { regNum, regText } from "../../../utils/constValidPatterns";

export const DeliveryPost = ({}) => {
	const {
		register,
		watch,
		formState: { errors, isValid, isValidating },
	} = useForm({ mode: "all" });

	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(deleteOrderDeliveryData());
			dispatch(removeError("deliveryPost"));
		};
	}, []);
	useEffect(() => {
		if (isValid && !isValidating) {
			dispatch(addOrderDeliveryData(watch()));
			dispatch(removeError("deliveryPost"));
		} else {
			dispatch(addError({ deliveryPost: true }));
		}
		return () => {
			const subscription = watch((data) => data);
			subscription.unsubscribe();
		};
	}, [isValidating]);

	return (
		<div className={styles.deliveryPost}>
			<label className={styles.cityContainer}>
				Ваше місто:
				<span
					style={{
						color: "red",
					}}
				>
					*
				</span>
				<input
					className={styles.city}
					type="text"
					name="city"
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

			<label className={styles.postNContainer}>
				Відділення НП{" "}
				<span
					style={{
						color: "red",
					}}
				>
					*
				</span>
				<input
					className={styles.postN}
					type="number"
					name="postNP"
					placeholder="№"
					onWheel={(e) => e.currentTarget.blur()}
					style={{
						border: `${errors?.city ? "solid 1px red" : ""}`,
					}}
					{...register("postNP", {
						required: "Треба заповнити поле",
						pattern: {
							value: regNum,
							message: "Поле має містити лише числа",
						},
						valueAsNumber: true,

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
			<p className={styles.error}>
				{errors?.postNP ? errors?.postNP?.message || "Error" : ""}
			</p>
		</div>
	);
};
