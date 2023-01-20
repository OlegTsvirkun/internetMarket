import React, { useCallback, useEffect, useState } from "react";
import { ContentWrapper } from "../ContentWrapper";
import { Input } from "../Input/Input";
import styles from "./CreateGood.module.scss";
import {hostAuth} from "../../axios";

import { Button } from "../Button";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { useDispatch, useSelector } from "react-redux";
import { getMain } from "../../store/mainSlice";
import { useRef } from "react";
import { Validator } from "../../utils/validator";
import { Tooltip } from "../Tooltip/Tooltip";
import { host } from "../../host";
import { removeImage } from "../../store/goodSlice";
import  services  from "../../store/services/service";

export const CreateGood = ({
	editing = false,
	setCreateGoodisOpen = true,
	_category = "",
	_name = "",
	_articul = "",
	_price = "",
	_picture = "",
	_images = [],
	_description = "",
	id = ''
}) => {
	const dispatch = useDispatch();
	const [category, setCategory] = useState(_category);
	const [name, setName] = useState(_name);
	const [articul, setArticul] = useState(_articul);
	const [price, setPrice] = useState(_price);
	const [picture, setPicture] = useState({});
	const [images, setImages] = useState([]);
	const [description, setDescription] = useState(_description);
	const [response, setResponse] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [isButton, setIsButton] = useState(false);

	const [errors, setErrors] = useState({});

	const [categoryError, setCategoryError] = useState("");
	const [nameError, setNameError] = useState("");
	const [articulError, setArticulError] = useState("");
	const [priceError, setPriceError] = useState("");
	const [pictureError, setPictureError] = useState(null);
	const [imagesError, setImagesError] = useState([]);
	const [descriptionError, setDescriptionError] = useState("");

	const { categories } = useSelector((state) => state.main);
	const createGood = async (goodData) => {
		const good = await hostAuth.post("/admin/create-good", goodData);
		return good.data;
	};
	const updateGood = async (goodData) => {
		const good = await hostAuth.post("/admin/update-good", goodData);
		return good.data;
	};
	const pictureCreate = document.getElementById("pictureCreateGood");
	const imageCreate = document.getElementById("imagesCreateGood");

	useEffect(() => {
		dispatch(getMain);
	}, [isOpen]);
	useEffect(() => {
		// console.log("picture", _picture);
		if (
			!Object.keys(errors)[0] &&
			name.length & articul.length &&
			price.length &&
			description.length
		) {
			setIsButton(true);
		} else setIsButton(false);
	}, [errors]);
	// useEffect(() => {
	//   setIsButton(false)
	// }, []);

	const blurHandler = (e, maxValue = 40, minValue = 3) => {
		// setIsButton(false)
		let obj = {};
		// console.log(e.target.value.length);
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
			setErrors({ ...errors, ...{ [e.target.name]: true } });
		} else {
			setErrors(
				Object.keys(errors).reduce((acc, item) => {
					if (item != e.target.name) acc[item] = errors[item];
					return acc;
				}, {}),
			);
		}

		// console.log(errors, nameError);
		return obj;
	};

	const handleCreate = useCallback(
		async (e) => {
			// e.preventDefault();
			// console.log();

			// setIsOpen(!isOpen);
			// console.log(e);
			// console.log(images, 'images');
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
			await createGood(formData)
				.then((res) => {
					if (!res.error) {
						setResponse(res);
						setIsOpen(!isOpen);
						console.log(res);
					} else {
						setResponse(res);
						setIsOpen(!isOpen);
					}
				})
				.catch((err) => {
					if (err.response) {
						setResponse(err.response.data.message);
						setIsOpen(!isOpen);
						console.log(err.response.data);
					}
					console.log(response);
				});
		},
		[name, price, articul, category, description, picture, images],
	);
	const handleUpdate = useCallback(async()=>{
		const formData = new FormData();
		formData.append("id", id);
		name != _name && formData.append("name", name);
		articul != _articul && formData.append("articul", articul);
		price != _price && formData.append("price", price);
		category != _category && formData.append("category", category);
		description!==_description && formData.append("description", description);
		picture?.name  && formData.append("picture", picture);
		images[0] && images?.forEach((file, i) => {
			formData.append(`image-${i}`, file);
		});
		// console.log('picture', picture);
		for(let key of formData.keys()){

			console.log(key);
		}
		await updateGood(formData)
				.then((res) => {
					if (!res.error) {
						setResponse(res);
						setIsOpen(!isOpen);
						console.log(res);
					} else {
						setResponse(res);
						setIsOpen(!isOpen);
					}
				})
				.catch((err) => {
					if (err.response) {
						setResponse(err.response.data.message);
						setIsOpen(!isOpen);
						console.log(err.response.data);
					}
					console.log(response);
				});
	},[name, price, articul, category, description, picture, images])


	const handleRemoveImage=(image) => {
		services.removeImageData({image:image})
		.then(res=>{
			if (!res.error) {
				dispatch(removeImage(image))
			console.log(res)
		}}
		
		).catch(err=>{
			if (err.response) {
			
			console.log(err.response.data);
		}})
		console.log();

}
	return (
		<ContentWrapper className={styles.createGood}>
			<h1 className={styles.createGood__title}>Новий товар</h1>
			<form id="formCreateGood">
				<div className={styles.createGood__container}>
					<div className={styles.createGood__containerInputs}>
						<label>
							Категорія
							<select
								name="category"
								// type="text"
								placeholder="Категорія"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
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
							Введіть назву{" "}
							<textarea
							rows={1}
								className={styles.createGood__name}
								name="name"
								placeholder="Назва товару"
								value={name}
								onChange={(e) => setName(e.target.value)}
								onInput={(e) => setNameError(blurHandler(e, 150))}
								onBlur={(e) => setNameError(blurHandler(e, 150))}
							/>
							{Object.keys(nameError)[0] && (
								<Tooltip
									error={Object.keys(nameError)[0]}
									className={"right"}
								/>
							)}
						</label>
						<div className={styles.createGood__containerInside}>
							<label>
								Артикул
								<Input
								containerClassname={styles.inputContainer}
									name="articul"
									type="number"
									placeholder="Артикул товару"
									value={articul}
									onChange={(e) => setArticul(e.target.value)}
									onInput={(e) => setArticulError(blurHandler(e, 10))}
									onBlur={(e) => setArticulError(blurHandler(e, 10))}
								/>
								{Object.keys(articulError)[0] && (
									<Tooltip
										error={Object.keys(articulError)[0]}
										className={"right"}
									/>
								)}
							</label>
							<label>
								Ціна
								<Input
								containerClassname={styles.inputContainer}

									name="price"
									type="number"
									placeholder="Ціна товару"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									onInput={(e) => setPriceError(blurHandler(e, 8, 2))}
									onBlur={(e) => setPriceError(blurHandler(e, 8, 2))}
								/>
								{Object.keys(priceError)[0] && (
									<Tooltip
										error={Object.keys(priceError)[0]}
										className={"right"}
									/>
								)}
							</label>
						</div>

						<label>
							Виберіть основне зображення
							<input
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
								onChange={(e) => setImages([...e.target.files])}
								name="picture"
								type="file"
								multiple={true}
								accept="image/*"
								id="imagesCreateGood"
							/>
							{/* <Input
								onChange={(e) => setImages(e.target.files)}
								name="picture"
								type="file"
                multiple ={true}
                accept ="image/*"
							/> */}
						</label>
					</div>
					{editing && <div className={styles.createGood__images}>
						<div>
							<img className={styles.createGood__imgMain} src={_picture} alt="" />
						</div>
						<div>
							{_images.map((image, i) => (
								<span key = {image} >
								<span  onClick={()=>handleRemoveImage(image) }>X</span>
								<img className={styles.createGood__img} key={i} src={process.env.REACT_APP_API_URL +image} />
								</span>
							))}
						</div>
					</div>}
					{/* <img className={styles.createGood__img} src={null} alt="" /> */}
				</div>
				<label className={styles.createGood__description}>
					{" "}
					Опис
					<textarea
						value={description}
						name="description"
						placeholder="Опис категорії"
						onChange={(e) => setDescription(e.target.value)}
						onInput={(e) => setDescriptionError(blurHandler(e, 2000, 5))}
						onBlur={(e) => setDescriptionError(blurHandler(e, 2000, 5))}
					/>
					{Object.keys(descriptionError)[0] && (
						<Tooltip
							error={Object.keys(descriptionError)[0]}
							className={"bottom"}
						/>
					)}
				</label>
				{isOpen && response && (
					<div className={styles.createGood__modal}>
						<div className={styles.createGood__modalMessege}>
							{response?.error && <p>{response.error}</p>}
							{response?.message && <p>{response.message}</p>}
						</div>
						<Button onClick={() => setCreateGoodisOpen(false)}>
							Вийти у головне меню
						</Button>
					{!editing &&	<Button
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
						</Button>}
					</div>
				)}
				{isOpen && <ModalWindow />}
			</form>
			{ <>{/* <img src={} alt="" /> */}</>}
			{
				isButton && !editing && <Button onClick={handleCreate}>Створити товар</Button>
			}
			{editing && <Button onClick={handleUpdate}>Змінити товар</Button>}
		</ContentWrapper>
	);
};
