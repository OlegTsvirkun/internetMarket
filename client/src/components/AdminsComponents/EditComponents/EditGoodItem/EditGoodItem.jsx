import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContentWrapper } from "../../../UA_Components/ContentWrapper/ContentWrapper";
import { useForm } from "react-hook-form";

import { Button } from "../../../UA_Components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { getMain } from "../../../../store/slices/mainSlice";
import { removeImage } from "../../../../store/slices/goodSlice";
import styles from "./EditGoodItem.module.scss";
import { DobleActionDelete } from "../DobleActionDelete/DobleActionDelete";
import adminServices from "../../../../store/services/adminServices";
import { ModalAlert } from "../../../AdditionalComponents/ModalAlert/ModalAlert";

export const EditGoodItem = ({
	_category = "",
	_name = "",
	_articul = "",
	_price = "",
	_picture = "",
	_images = [],
	_description = "",
	id = "",
}) => {
	const dispatch = useDispatch();
	const [response, setResponse] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [isError, setIsError] = useState(false);

	const {
		register,
		getValues,
		setValue,
		formState: { errors, isValid},
	} = useForm({ mode: "onBlur" });

	const { categories } = useSelector((state) => state.main);

	// const updateGood = async (goodData) => {
	// 	const good = await hostAuth.post("/admin/update-good", goodData);
	// 	return good.data;
	// };
useEffect(() => {
	setValue('name',_name)
	setValue('category',_category)
	setValue('articul',_articul)
	setValue('price',_price)
	setValue('description',_description)

	return () => {
		
	};
}, []);
useEffect(() => {
}, [isValid]);
	useEffect(() => {
		dispatch(getMain);
	}, [isOpen]);
	


	const handleUpdate = useCallback(async () => {
		const formData = new FormData();
		formData.append("id", id);
		getValues("name")!=_name && formData.append("name", getValues("name"));
		getValues("articul")!=_articul && formData.append("articul", getValues("articul"));
		getValues("price")!=_price && formData.append("price", getValues("price"));
		getValues("category") != _category&& formData.append("category", getValues("category"));
		getValues("description")!=_description && formData.append("description", getValues("description"));
		getValues("picture")[0] && formData.append("picture", getValues("picture")[0] || "");
		const images = Array.from(getValues("images") || {});
		images[0] && images.forEach((file, i) => {
			formData.append(`image-${i}`, file);
		});
		
		
		await adminServices.updateGood(formData)
			.then((res) => {
				if (!res.error) {
					setResponse(res);
					setIsOpen(true);
					setIsError(true)
					console.log(res);
				} else {
					setResponse(res);
					setIsOpen(true);
					setIsError(false)
					console.log(res);


				}
			})
	}, [getValues]);

	const handleRemoveImage = (image) => {
		adminServices
			.removeImageData({ image: image })
			.then((res) => {
				if (!res.error) {
					dispatch(removeImage(image));
				}
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data);
				}
			});
	};
	return (
		<ContentWrapper className={styles.createGood}>
			<h1 className={styles.title}>Редагування товару</h1>
			<form >
				<div className={styles.container}>
					<div className={styles.containerInputs}>
						<label>
							Категорія
							<select
								{...register("category")}
								name="category"
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
							Назва товару{" "}
							<input
								{...register("name", {
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
								className={styles.name}
								placeholder="Назва товару"
							/>
						</label>
						<p className={styles.error}>
							{errors?.name ? errors?.name?.message || "Error" : ""}
						</p>

						<div className={styles.smallInputs}>
							<label>
								Артикул
								<input
									{...register("articul", {
										required: "Треба заповнити поле",
										minLength: {
											value: 6,
											message:
												"Артикул товару повиннен бути не менше 6 символів",
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
							</label>
							<label>
								Ціна
								<input
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
								/>
							</label>
						</div>
						<p className={styles.error}>
							{errors?.articul || errors?.price
								? errors?.articul?.message || errors?.price?.message || "Error"
								: ""}
						</p>
						<label>
							Додати додаткові зображення
							<input
								{...register("images")}
								className={styles.input}
								
								type="file"
								multiple={true}
								accept="image/*"
							/>
						</label>
					</div>
					<div className={styles.images}>
						<label className={styles.containerMainImg}>
							Змінити основне зображення
							<input
								{...register("picture")}
								className={styles.imgMainInput}
								type="file"
								multiple={false}
							/>
							<img
								className={styles.imgMain}
								src={process.env.REACT_APP_API_URL + _picture }
								alt=""
							/>
						</label>
					</div>
				</div>
				<div className={styles.imgContainer}>
					{_images.map((image, i) => (
						<div className={styles.imgItemContainer} key={image}>
							<DobleActionDelete onClick={() => handleRemoveImage(image)} />
							<img
								className={styles.img}
								src={process.env.REACT_APP_API_URL + image}
							/>
						</div>
					))}
				</div>
				<p className={styles.error}>
					{errors?.description ? errors?.description?.message || "Error" : ""}
				</p>
				<label className={styles.description}>
					{" "}
					Опис
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
						
						placeholder="Опис категорії"
					/>
				</label>
			
			</form>

			<Button isDisableButton={!isValid} onClick={handleUpdate}>
				Змінити товар
			</Button>

			{isOpen &&
				(isError ? (
					<ModalAlert message= {response?.error || "Error!"} isErrorWindow={true} closeClick={() => setIsOpen(false)} title="Помилка">
					</ModalAlert>
				) : (
					<ModalAlert
						closeClick={() => {
							setIsOpen(false)
						}}
						title="Оповіщення"
						className={styles.message}
						message= {response?.message || "!!!"} 
					>
					</ModalAlert>
				))}

		</ContentWrapper>
	);
};
