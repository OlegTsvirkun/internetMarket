import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../UA_Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getMain } from "../../../store/mainSlice";
import { typeValidator, valueValidator } from "../../../utils/validator";
import { Tooltip } from "../../Tooltip/Tooltip";
import styles from "./CreateGood.module.scss";
import { ModalAlert } from "../../ModalAlert/ModalAlert";
import { useForm } from "react-hook-form";
import {
	addAdminError,
	addFields,
	addNewGoodFields,
	clearFields,
	createNewGood,
	removeAdminError,
} from "../../../store/adminSlice";

export const CreateGood_ = ({}) => {
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		reset,
		formState: { errors, isValid,defaultValues },
	} = useForm({ mode: "onBlur" });
console.log();
	// const [category, setCategory] = useState("");
	// const [name, setName] = useState("");
	// const [articul, setArticul] = useState("");
	// const [price, setPrice] = useState("");
	// const [picture, setPicture] = useState({});
	const [images, setImages] = useState([]);
	// const [description, setDescription] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [isButton, setIsButton] = useState(false);

	const catSelect = useRef();
	const goodPic = useRef();
	const goodImgs = useRef();

	const { categories, isLoading: catLoading } = useSelector(
		(state) => state.main,
	);
	const { isError, errMessage,  message, isLoading } = useSelector(
		(state) => state.admin,
	);

	// const pictureCreate = document.getElementById("pictureCreateGood");
	// const imageCreate = document.getElementById("imagesCreateGood");
	//! getMAin
	useEffect(() => {
		dispatch(getMain);
	}, []);

	const handleCreate = useCallback(
		async (e) => {
				e.preventDefault();
				console.log(
				
				// getValues("images"), "category",
				// getValues("category"), "category",
				// getValues("name"), "name",
				// getValues("articul"), "articul",
				// getValues("price"), "price",
				// getValues("category"), "category",
				// getValues("description")," description",
				// getValues("picture"), "picture",
				)
				const formData = new FormData();
				formData.append("name", getValues("name"));
				formData.append("articul", getValues("articul"));
				formData.append("price", getValues("price"));
				formData.append("category", getValues("category"));
				formData.append("description", getValues("description"));
				formData.append("picture", getValues("picture")[0]);
				const images =Array.from(getValues("images"))
				console.log( getValues("picture")[0]);
				// Array.from(images)
				images?.forEach((file, i) => {
					formData.append(`image-${i}`, file);
				});

				await dispatch(createNewGood(formData)).then((res) => {
					setIsOpen(true);
					if (!res.error) {
						reset()
					
					}
				});
		},
		[getValues],
	);
	return (
		<div className={styles.createGood}>
			<h1 className={styles.createGood__title}>Новий товар</h1>
			<form id="formCreateGood">
				<div className={styles.createGood__container}>
					<div className={styles.createGood__containerInputs}>
						<label>
							Категорія
							<select
							{...register("category")}
								// type="text"
								placeholder="Категорія"
							>
								{categories &&
									Object.keys(categories).map((key) => (
										<option key={key} value={categories[key]}>
											{categories[key]}
										</option>
									))}
							</select>
						</label>

						<label>
							Введіть назву
							<input
								{...register("name", {
									required: "Треба заповнити поле",
									minLength: {
										value: 3,
										message: "Назва повинна бути не менше 3 символів",
									},
									maxLength: {
										value: 20,
										message: "Назва повинна бути не більше 40 символів",
									},
								})}
								className={styles.createGood__name}
								placeholder="Назва товару"
							/>
						</label>
						
							<p className={styles.error}>
								{errors?.name ? errors?.name?.message || "Error" : ""}
							</p>
						

						<div className={styles.createGood__containerInside}>
							<input
								style={{ border: `${errors?.articul ? "solid 1px red" : ""}` }}
								{...register("articul", {
									required: "Треба заповнити поле",
									minLength: {
										value: 6,
										message: "Артикул товару повиннен бути не менше 6 символів",
									},
									maxLength: {
										value: 10,
										message:
											"Артикул товару повиннен бути не більше 10 символів",
									},
								})}
								type="number"
								placeholder="Артикул товару"
							/>

							<input
								style={{ border: `${errors?.price ? "solid 1px red" : ""}` }}
								{...register("price", {
									required: "Треба заповнити поле",
									minLength: {
										value: 2,
										message: "Ціна товару повинна бути не менше 2 символів",
									},
									maxLength: {
										value: 10,
										message: "Ціна товару повинна бути не більше 10 символів",
									},
								})}
								type="number"
								placeholder="Ціна товару"
							></input>
						</div>
						<p className={styles.error}>
							{errors?.articul || errors?.price
								? errors?.articul?.message || errors?.price?.message || "Error"
								: ""}
						</p>
						<label>
							Виберіть основне зображення
							<input
							{...register("picture",{required: "Треба вибрати зображення",})}

								// ref={goodPic}
								id="pictureCreateGood"
								// name="picture"
								type="file"
								multiple={false}
								accept="image/*"

							/>
						</label>
						<p className={styles.error}>
							{errors?.picture 
								? errors?.picture?.message  || "Error"
								: ""}
						</p>
						<label>
							Виберіть додаткові зображення
							<input
							{...register("images")}

								// ref={goodImgs}
								// name="picture"
								type="file"
								multiple={true}
								accept="image/*"
								// id="imagesCreateGood"
							/>
						</label>

					</div>
				</div>
				<p className={styles.error}>
							{errors?.description 
								? errors?.description?.message  || "Error"
								: ""}
						</p>
				<label className={styles.createGood__description}>
					Опис категорії
					<textarea
					{...register("description", {
						required: "Треба заповнити поле",
						minLength: {
							value: 10,
							message: "Ціна товару повинна бути не менше 10 символів",
						},
						maxLength: {
							value: 3000,
							message: "Ціна товару повинна бути не більше 3000 символів",
						},
					})}
					 placeholder="Опис категорії" />
				</label>

			</form>
				{
					<Button onClick={(e)=>handleCreate(e)} isDisableButton={!isValid}>
						Створити товар
					</Button>
				}
				{isOpen &&
					(isError ? (
						<ModalAlert closeClick={() => setIsOpen(false)} title="Error">
							<p className={styles.alertMessage}>{errMessage}</p>
						</ModalAlert>
					) : (
						<ModalAlert
							closeClick={() => setIsOpen(false)}
							title="Оповіщення"
							className={styles.message}
						>
							<p>{message}</p>
						</ModalAlert>
					))}
		</div>
	);
};
