import styles from "./CreateCategory.module.scss";

import React, { useCallback, useRef } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import { ContentWrapper } from "../../components/UA_Components/ContentWrapper";
import { Input } from "../../UA_Components/Input/Input";
import { Button } from "../../UA_Components/Button";
import adminServices from "../../../store/services/adminServices";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addAdminError,
	addFields,
	removeAdminError,
	createNewCategory,
	clearFields,
	addNewCategoryFields,
} from "../../../store/adminSlice";
import { Tooltip } from "../../Tooltip/Tooltip";
import { valueValidator } from "../../../utils/validator";
import { ModalAlert } from "../../ModalAlert/ModalAlert";

export const CreateCategory = ({}) => {
	const [category, setCategory] = useState("");
	const [picture, setPicture] = useState(null);
	const [description, setDescription] = useState("");
	const [descriptionError, setDescriptionError] = useState("");
	const [showErr, setIsShowErr] = useState(false);

	const [categoryError, setCategoryError] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const pic = useRef();
	const filled = useRef(false);
	const dispatch = useDispatch();
	const { createCategory } = useSelector((state) => state.admin.fields);
	const { isError, errMessage, errors, message, isLoading } = useSelector(
		(state) => state.admin,
	);

	useEffect(() => {
		const errors = {
			category: true,
			description: false,
		};
		const data = {
			category: category,
			description: description,
		};
		if (Object.keys(createCategory)[0]) {
			setCategory(createCategory?.category || "");
			setDescription(createCategory?.description || "");
		} else {
			dispatch(addFields({ createCategory: data }));
			dispatch(addAdminError(errors));
		}
	}, []);

	const handlePicture = (e) => {
		setPicture(e.target.files[0]);
		if (category && description) filled.current = true;
		else filled.current = false;
	};

	const blurHandler = useCallback(
		(e, onlyText = true, minValue = 3, maxValue = 40, empty = false) => {
			setIsShowErr(false);
			let obj = {};
			// console.log(checkbox.current);
			obj = valueValidator(e, onlyText, minValue, maxValue, empty);
			if (Object.keys(obj)[0]) {
				dispatch(addAdminError({ [e.target.name]: true }));
			} else {
				dispatch(removeAdminError({ [e.target.name]: false }));
				dispatch(addNewCategoryFields({ [e.target.name]: e.target.value }));
			}
			category && description && picture
				? (filled.current = true)
				: (filled.current = false);
			return obj;
		},
		[category, description, picture],
	);

	const handleCreateCategory = useCallback(
		async (e) => {
			e.preventDefault();
			if (Object.keys(errors)[0]) {
				return setIsShowErr(true);
			}
			const formData = new FormData();
			formData.append("category", category);
			formData.append("description", description);
			formData.append("picture", picture);

			await dispatch(createNewCategory(formData)).then((res) => {
				setIsModalOpen(true);
				if (!res.error) {
					setCategory("");
					setDescription("");
					dispatch(clearFields({ createCategory: {} }));
					pic.current.value = "";
				}
			});
		},
		[category, description, picture],
	);
	return (
		<div className={styles.createCategory}>
			<h1 className={styles.title}>Нова категорія</h1>
			<form
			>
				<div className={styles.container}>
					<div className={styles.containerInputs}>
						<Input
							labelTitle={Object.keys(categoryError)[0] && showErr ? 
								<span>Введіть назву <span style={{color: "red"}}>{Object.keys(categoryError)[0]}</span></span>
								:"Введіть назву"
							}
							// labelTitle="Введіть назву"
							style={{border:`${Object.keys(categoryError)[0] &&showErr&& "2px solid red"}`}}
							className={styles.input}
							name="category"
							type="text"
							placeholder="Назва категорії"
							value={category}
							onClick={() => setCategoryError({})}
							onChange={(e) => setCategory(e.target.value)}
							onBlur={(e) =>
								setCategoryError(blurHandler(e, true, 3, 25, false))
							}
							onInput={(e) =>
								setCategoryError(blurHandler(e, true, 3, 25, false))
							}
						>
						
						</Input>
						<label style ={{color:`${!picture && showErr ?"red": ""}`}} className={styles.pictureInput}>
							Виберіть зображення
							<input
								ref={pic}
								onChange={(e) => handlePicture(e)}
								name="picture"
								type="file"
							/>
						</label>
					</div>
					<img className={styles.img} src={null} alt="" />
				</div>
				<label className={styles.description}>
					{" "}
					Опис: {Object.keys(descriptionError)[0] && showErr && (
						<span style={{color: "red"}}>{Object.keys(descriptionError)[0]}</span>
					)}
					<textarea
						onClick={() => setDescriptionError({})}
						style ={{border:`${Object.keys(descriptionError)[0] && showErr ?"solid 2px red": ""}`}}
						value={description}
						name="description"
						placeholder="Опис категорії"
						onChange={(e) => setDescription(e.target.value)}
						onInput={(e) => {
							setDescriptionError(blurHandler(e, false, 20, 300, false));
						}}
						onBlur={(e) =>
							setDescriptionError(blurHandler(e, false, 20, 300, false))
						}
					/>
				
				</label>
			</form>
			<div className={styles.confirm}>
				{filled.current && (
					<Button onClick={handleCreateCategory}>Створити категорію</Button>
				)}
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
