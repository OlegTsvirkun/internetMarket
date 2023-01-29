import React, { useCallback, useEffect, useRef, useState } from "react";

import { ContentWrapper } from "../../../components/UA_Components/ContentWrapper/";
import { Input } from "../../../components/UA_Components/Input/Input";
import { Button } from "../../../components/UA_Components/Button";
import { hostAuth } from "../../../axios";

import { ModalWindow } from "../../../components/ModalWindow/ModalWindow";
import { useDispatch, useSelector } from "react-redux";
import { getMain } from "../../../store/mainSlice";
import { typeValidator, valueValidator } from "../../../utils/validator";
import { Tooltip } from "../../../components/Tooltip/Tooltip";
import { removeImage } from "../../../store/goodSlice";
import services from "../../../store/services/service";
import { useNavigate } from "react-router-dom";
import styles from "./CreateGood.module.scss";
import { ModalAlert } from "../../ModalAlert/ModalAlert";
import {
	addAdminError,
	addFields,
	addNewGoodFields,
	clearFields,
	createNewGood,
	removeAdminError,
} from "../../../store/adminSlice";

export const CreateGood = ({}) => {
	const dispatch = useDispatch();
	const { createGood } = useSelector((state) => state.admin.fields);
	const { isError, errMessage, errors, message, isLoading } = useSelector(
		(state) => state.admin,
	);
	const [category, setCategory] = useState("");
	const [name, setName] = useState("");
	const [articul, setArticul] = useState("");
	const [price, setPrice] = useState("");
	const [picture, setPicture] = useState({});
	const [images, setImages] = useState([]);
	const [description, setDescription] = useState("");
	const [response, setResponse] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [isButton, setIsButton] = useState(false);

	// const [errors, setErrors] = useState({});

	const [categoryError, setCategoryError] = useState("");
	const [nameError, setNameError] = useState("");
	const [articulError, setArticulError] = useState("");
	const [priceError, setPriceError] = useState("");
	const [pictureError, setPictureError] = useState(null);
	const [imagesError, setImagesError] = useState([]);
	const [descriptionError, setDescriptionError] = useState("");
	const catSelect = useRef();
	const goodPic = useRef();
	const goodImgs = useRef();

	const { categories, isLoading: catLoading } = useSelector(
		(state) => state.main,
	);

	const pictureCreate = document.getElementById("pictureCreateGood");
	const imageCreate = document.getElementById("imagesCreateGood");
	//! getMAin
	useEffect(() => {
		dispatch(getMain);
	}, []);
	useEffect(() => {
	
		setCategory(categories[Object.keys(categories)[0]]);
	}, [catLoading]);
	useEffect(() => {
		const data = {
			category: categories[Object.keys(categories)[0]] || '',
			name: name,
			articul: articul,
			price: price,
			description: description,
		};
		if (Object.keys(createGood)[0]) {
			setCategory(createGood?.category || "");
			setName(createGood?.name || "");
			setArticul(createGood?.articul || "");
			setPrice(createGood?.price || "");
			setDescription(createGood?.description || "");
		} else dispatch(addFields({ createGood: data }));
	}, []);

	const blurHandler = useCallback(
		(e, onlyText = true, minValue = 3, maxValue = 40, empty = false) => {
			let obj = {};
			obj = valueValidator(e, onlyText, minValue, maxValue, empty);
			if (Object.keys(obj)[0]) {
				dispatch(addAdminError({ [e.target.name]: true }));
			} else {
				dispatch(removeAdminError({ [e.target.name]: false }));
				dispatch(addNewGoodFields({ [e.target.name]: e.target.value }));
			}
			return obj;
		},
		[
      name, articul, price, category, description
    ],
	);

	const handleCreate = useCallback(
		async (e) => {
			e.preventDefault();
			const formData = new FormData();
			formData.append("name", name);
			formData.append("articul", articul);
			formData.append("price", price);
			formData.append("category", category);
			formData.append("description", description);
			formData.append("picture", picture);
			images?.forEach((file, i) => {
				formData.append(`image-${i}`, file);
			});

			await dispatch(createNewGood(formData)).then((res) => {
				setIsOpen(true);
				if (!isError) {
					setCategory("");
					setDescription("");
					setName("");
					setArticul("");
					setPrice("");
					dispatch(clearFields({createGood:{}}));

					// fileCreateCategory.value = "";
					goodPic.current.value = "";
					goodImgs.current.value = "";
				}
			});
			// await createGood(formData)
			// 	.then((res) => {
			// 		if (!res.error) {
			// 			setResponse(res);
			// 			setIsOpen(!isOpen);
			// 			console.log(res);
			// 		} else {
			// 			setResponse(res);
			// 			setIsOpen(!isOpen);
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		if (err.response) {
			// 			setResponse(err.response.data.message);
			// 			setIsOpen(!isOpen);
			// 			console.log(err.response.data);
			// 		}
			// 		console.log(response);
			// 	});
		},
		[name, price, articul, category, description, picture, images],
	);
	// console.log(catSelect.current?.value);
	return (
		<div className={styles.createGood}>
			<h1 className={styles.createGood__title}>Новий товар</h1>
			<form id="formCreateGood">
				<div className={styles.createGood__container}>
					<div className={styles.createGood__containerInputs}>
						<label>
							Категорія
							<select
								ref={catSelect}
								name="category"
								// type="text"
								placeholder="Категорія"
								value={category}
								onChange={(e) => {
									setCategory(e.target.value);
									dispatch(
										addNewGoodFields({ [e.target.name]: e.target.value }),
									);
								}}
							>
								{categories &&
									Object.keys(categories).map((key) => (
										<option key={key} value={categories[key]}>
											{categories[key]}
										</option>
									))}
							</select>
						</label>

						<Input
							labelTitle="Введіть назву"
							rows={1}
							className={styles.createGood__name}
							name="name"
							placeholder="Назва товару"
							value={name}
							onChange={(e) => setName(e.target.value)}
							onInput={(e) =>
								setNameError(blurHandler(e, false, 3, 150, false))
							}
							onBlur={(e) => setNameError(blurHandler(e, false, 3, 150, false))}
						/>
						{Object.keys(nameError)[0] && (
							<Tooltip error={Object.keys(nameError)[0]} className={"right"} />
						)}
						<div className={styles.createGood__containerInside}>
							<Input
								labelTitle="Артикул"
								containerClassname={styles.inputContainer}
								name="articul"
								type="number"
								placeholder="Артикул товару"
								value={articul}
								onChange={(e) => setArticul(e.target.value)}
								onInput={(e) =>
									setArticulError(blurHandler(e, false, 3, 10, false))
								}
								onBlur={(e) =>
									setArticulError(blurHandler(e, false, 3, 10, false))
								}
							>
								{Object.keys(articulError)[0] && (
									<Tooltip
										error={Object.keys(articulError)[0]}
										className={"right"}
									/>
								)}
							</Input>

							<Input
								labelTitle="Ціна"
								containerClassname={styles.inputContainer}
								name="price"
								type="number"
								placeholder="Ціна товару"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								onInput={(e) =>
									setPriceError(blurHandler(e, false, 3, 10, false))
								}
								onBlur={(e) =>
									setPriceError(blurHandler(e, false, 3, 10, false))
								}
							>
								{Object.keys(priceError)[0] && (
									<Tooltip
										error={Object.keys(priceError)[0]}
										className={"right"}
									/>
								)}
							</Input>
						</div>

						<label>
							Виберіть основне зображення
							<input
								ref={goodPic}
								id="pictureCreateGood"
								onChange={(e) => setPicture(e.target.files[0])}
								name="picture"
								type="file"
								multiple={false}
							/>
						</label>
						<label>
							Виберіть додаткові зображення
							<input
								ref={goodImgs}
								onChange={(e) => setImages([...e.target.files])}
								name="picture"
								type="file"
								multiple={true}
								accept="image/*"
								id="imagesCreateGood"
							/>
						</label>
					</div>
					{/* {editing && (
						<div className={styles.createGood__images}>
							<div>
								<img
									className={styles.createGood__imgMain}
									src={_picture}
									alt=""
								/>
							</div> */}
					{/* <div> */}
					{/* {_images.map((image, i) => (
									<span key={image}>
										<span onClick={() => handleRemoveImage(image)}>X</span>
										<img
											className={styles.createGood__img}
											key={i}
											src={process.env.REACT_APP_API_URL + image}
										/>
									</span>
								))} */}
					{/* </div>
						</div>
					)} */}
					{/* <img className={styles.createGood__img} src={null} alt="" /> */}
				</div>
				<label className={styles.createGood__description}>
					Опис категорії
					<textarea
						value={description}
						name="description"
						placeholder="Опис категорії"
						onChange={(e) => setDescription(e.target.value)}
						onInput={(e) =>
							setDescriptionError(blurHandler(e, false, 5, 2000, false))
						}
						onBlur={(e) =>
							setDescriptionError(blurHandler(e, false, 5, 2000, false))
						}
					/>
					{Object.keys(descriptionError)[0] && (
						<Tooltip
							error={Object.keys(descriptionError)[0]}
							className={"top"}
						/>
					)}
				</label>
				{/* {isOpen && response && (
					<div className={styles.createGood__modal}>
						<div className={styles.createGood__modalMessege}>
							{response?.error && <p>{response.error}</p>}
							{response?.message && <p>{response.message}</p>}
						</div>
						<Button onClick={() => setCreateGoodisOpen(false)}>
							Вийти у головне меню
						</Button> */}
				{/* {!editing && (
							<Button
								onClick={(e) => {
									setIsOpen(false);
									setName("");
									setArticul("");
									setPrice("");
									setPicture(null);
									setImages(null);
									imageCreate.value = null;
									pictureCreate.value = null;
									setDescription("");
								}}
							>
								Додати ще товарk
							</Button>
						)} */}
				{/* </div>
				)} */}
				{!Object.keys(errors)[0] && category && description && name &&articul && price &&(
					<Button onClick={handleCreate}>Створити товар</Button>
				)}
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
				{/* {isOpen && (
					<ModalAlert closeClick={() => setIsOpen(false)}></ModalAlert>
				)} */}
			</form>
		</div>
	);
};
