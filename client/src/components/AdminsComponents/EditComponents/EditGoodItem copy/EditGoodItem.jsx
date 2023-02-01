import React, { useCallback, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { ContentWrapper } from "../../../UA_Components/ContentWrapper";
import { Input } from "../../../UA_Components/Input/Input";
import {hostAuth} from "../../../../axios";

import { Button } from "../../../UA_Components/Button";
import { ModalWindow } from "../../../ModalWindow/ModalWindow";
import { useDispatch, useSelector } from "react-redux";
import { getMain } from "../../../../store/mainSlice";
import { Validator, valueValidator } from "../../../../utils/validator";
import { Tooltip } from "../../../AdditionalComponents/Tooltip/Tooltip";
import { removeImage } from "../../../../store/goodSlice";
import  services  from "../../../../store/services/service";
import styles from "./EditGoodItem.module.scss";
import { DobleActionDelete } from "../DobleActionDelete/DobleActionDelete";
import adminServices from "../../../../store/services/adminServices";

export const EditGoodItem = ({
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
	
	const updateGood = async (goodData) => {
		const good = await hostAuth.post("/admin/update-good", goodData);
		return good.data;
	};


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

	const blurHandler = (e,onlyText, maxValue = 40, minValue = 3) => {
		let obj = {};
		obj = valueValidator(e,onlyText, maxValue, minValue)
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

		return obj;
	};

	
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
		console.log(image,'deleted');
		adminServices.removeImageData({image:image})
		.then(res=>{
			if (!res.error) {
				dispatch(removeImage(image))
			console.log(res)
		}}
		
		).catch(err=>{
			if (err.response) {
			// setResponse(err.response.data.message);
			// setIsOpen(!isOpen);
			console.log(err.response.data);
		}})

}
	return (
		<ContentWrapper className={styles.createGood}>
			<h1 className={styles.title}>Редагування товару</h1>
			<form id="formCreateGood">
				<div className={styles.container}>
					<div className={styles.containerInputs}>
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
							Назва товару{" "}
							<textarea
							rows={1}
								className={styles.name}
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
						<div className={styles.containerInside}>
							<label>
								Артикул
								<Input
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
							Додати додаткові зображення
							<input
							className={styles.input}
								onChange={(e) => setImages([...e.target.files])}
								name="picture"
								type="file"
								multiple={true}
								accept="image/*"
								id="imagesCreateGood"
							/>
							
						</label>
					</div>
					<div className={styles.images}>
						
						<label className={styles.containerMainImg}>
							Змінити основне зображення
							<input
							className={styles.imgMainInput}
								id="pictureCreateGood"
								onChange={(e) => setPicture(e.target.files[0])}
								name="picture"
								type="file"
								multiple={false}
							/>
							<img className={styles.imgMain} src={process.env.REACT_APP_API_URL +_picture} alt="" />
						</label>
						
						
					</div>
				</div>
				<div className={styles.imgContainer}>
							{_images.map((image, i) => (
								<div className={styles.imgItemContainer}  key = {image} >
							
								 <DobleActionDelete  onClick={()=>handleRemoveImage(image)}/>
								<img className={styles.img} src={process.env.REACT_APP_API_URL +image} />
								</div>
							))}
						</div>
				<label className={styles.description}>
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
					<div className={styles.modal}>
						<div className={styles.modalMessege}>
							{response?.error && <p>{response.error}</p>}
							{response?.message && <p>{response.message}</p>}
						</div>
						<Button onClick={() => setCreateGoodisOpen(false)}>
							Вийти у головне меню
						</Button>
					
					</div>
				)}
				{isOpen && <ModalWindow />}
			</form>
			{ <>{/* <img src={} alt="" /> */}</>}
			
			<Button onClick={handleUpdate}>Змінити товар</Button>
		</ContentWrapper>
	);
};
