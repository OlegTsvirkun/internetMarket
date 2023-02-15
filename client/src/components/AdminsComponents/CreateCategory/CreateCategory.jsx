import React, { useCallback } from "react";
import { useState } from "react";
import { Button } from "../../UA_Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { createNewCategory } from "../../../store/slices/adminSlice";
import { useForm } from "react-hook-form";
import { ModalAlert } from "../../AdditionalComponents/ModalAlert/ModalAlert";
import styles from "./CreateCategory.module.scss";

export const CreateCategory = ({}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useDispatch();
	const { isError, errMessage, message, isLoading } = useSelector(
		(state) => state.admin,
	);

	const {
		register,
		getValues,
		reset,
		formState: { errors, isValid, defaultValues },
	} = useForm({ mode: "onBlur" });

	const handleCreate = useCallback(
		async (e) => {
			e.preventDefault();
			const formData = new FormData();
			formData.append("category", getValues("category"));
			formData.append("description", getValues("description"));
			formData.append("picture", getValues("picture")[0]);

			await dispatch(createNewCategory(formData)).then((res) => {
				setIsModalOpen(true);
				if (!res.error) {
					reset();
				}
			});
		},
		[getValues],
	);

	return (
		<div className={styles.createCategory}>
			<h1 className={styles.title}>Нова категорія</h1>
			<form>
				<div className={styles.container}>
					<div className={styles.containerInputs}>
						<label>
							Введіть назву
							<input
								{...register("category", {
									required: "Треба заповнити поле",
									minLength: {
										value: 3,
										message: "Назва повинна бути не менше 3 символів",
									},
									maxLength: {
										value: 25,
										message: "Назва повинна бути не більше 25 символів",
									},
								})}
								className={styles.input}
								placeholder="Назва категорії"
							/>
						</label>
						<p className={styles.error}>
							{errors?.category ? errors?.category?.message || "Error" : ""}
						</p>

						<label>
							Виберіть основне зображення
							<input
								{...register("picture", {
									required: "Треба вибрати зображення",
								})}
								id="pictureCreateGood"
								type="file"
								multiple={false}
								accept="image/*"
							/>
						</label>
						<p className={styles.error}>
							{errors?.picture ? errors?.picture?.message || "Error" : ""}
						</p>
					</div>
					{/* <img className={styles.img} src={null} alt="" /> */}
				</div>
				<p className={styles.error}>
					{errors?.description ? errors?.description?.message || "Error" : ""}
				</p>
				<label className={styles.description}>
					Опис категорії
					<textarea
						{...register("description", {
							required: "Треба заповнити поле",
							minLength: {
								value: 10,
								message: "Опис категоріі повинен бути не менше 10 символів",
							},
							maxLength: {
								value: 3000,
								message: "Опис категоріі повинен бути не більше 3000 символів",
							},
						})}
						placeholder="Опис категорії"
					/>
				</label>
			</form>
			<div className={styles.confirm}>
				<Button onClick={handleCreate} isDisableButton={!isValid}>
					Створити категорію
				</Button>
			</div>
			{isModalOpen &&
				(isError ? (
					<ModalAlert closeClick={() => setIsModalOpen(false)} title="Error">
						<p className={styles.alertMessage}>{errMessage}</p>
					</ModalAlert>
				) : (
					<ModalAlert
						closeClick={() => setIsModalOpen(false)}
						title="Оповіщення"
						className={styles.message}
					>
						<p>{message}</p>
					</ModalAlert>
				))}
		</div>
	);
};
