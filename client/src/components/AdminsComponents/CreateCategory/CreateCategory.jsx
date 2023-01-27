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
} from "../../../store/adminSlice";
import { Tooltip } from "../../Tooltip/Tooltip";
import { valueValidator } from "../../../utils/validator";
import { ModalAlert } from "../../ModalAlert/ModalAlert";

export const CreateCategory = ({}) => {
	const [category, setCategory] = useState("");
	const [picture, setPicture] = useState(null);
	const [description, setDescription] = useState("");

	const [descriptionError, setDescriptionError] = useState("");
	const [categoryError, setCategoryError] = useState("");

	const [response, setResponse] = useState({ response: "ALERTTT!!!" });
	const [isOpen, setIsOpen] = useState(false);
	const form = useRef();
	const pic = useRef();
	const dispatch = useDispatch();
	const { createCategory } = useSelector((state) => state.admin.fields);
	const { isError, errMessage, message, isLoading } = useSelector(
		(state) => state.admin,
	);
	const fileCreateCategory = document.getElementById('fileCreateCategory')

	useEffect(() => {
		const data = {
			createCategory: {
				category: category,
				description: description,
			},
		};
		dispatch(addFields(data));
		setCategory(createCategory?.category || "");
		setDescription(createCategory?.description || "");
	}, []);

	const blurHandler = (
		e,
		onlyText = true,
		minValue = 3,
		maxValue = 40,
		empty = false,
	) => {
		let obj = {};
		obj = valueValidator(e, onlyText, minValue, maxValue, empty);
		if (Object.keys(obj)[0]) {
			dispatch(addAdminError({ [e.target.name]: true }));
		} else {
			dispatch(removeAdminError({ [e.target.name]: false }));
			dispatch(
				addFields({ createCategory: { [e.target.name]: e.target.value } }),
			);
		}
		return obj;
	};

	const handleCreateCategory = useCallback(
		async (e) => {
			e.preventDefault();
			const formData = new FormData();
			formData.append("category", category);
			formData.append("description", description);
			formData.append("picture", picture);

			await dispatch(createNewCategory(formData)).then((res) => {
				setIsOpen(true);
				if (!isError) {
					setCategory("");
					setDescription("");
					dispatch(clearFields())
					fileCreateCategory.value=''
					pic.current.value=''
				}
			});
		},
		[category, description, picture],
	);
	return (
		<div className={styles.createCategory}>
			<h1 className={styles.title}>Нова категорія</h1>
			<form ref={form} id='formCreateCategory'>
				<div className={styles.container}>
					<div className={styles.containerInputs}>
						<Input
							labelTitle="Введіть назву"
							className={styles.input}
							name="category"
							type="text"
							placeholder="Назва категорії"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							onInput={(e) =>
								setCategoryError(blurHandler(e, true, 3, 25, false))
							}
							onBlur={(e) =>
								setCategoryError(blurHandler(e, true, 3, 25, false))
							}
						>
							{Object.keys(categoryError)[0] && (
								<Tooltip
									error={Object.keys(categoryError)[0]}
									className="right"
								/>
							)}
						</Input>
						<label className={styles.pictureInput}>
							Виберіть зображення
							<input
							ref={pic}
							id="fileCreateCategory"
								// labelTitle="Виберіть зображення"
								onChange={(e) => setPicture(e.target.files[0])}
								name="picture"
								type="file"
							/>
						</label>
					</div>
					<img className={styles.img} src={null} alt="" />
				</div>
				<label className={styles.description}>
					{" "}
					Опис:
					<textarea
						value={description}
						name="description"
						placeholder="Опис категорії"
						onChange={(e) => setDescription(e.target.value)}
						onInput={(e) =>
							setDescriptionError(blurHandler(e, false, 20, 300, false))
						}
						onBlur={(e) =>
							setDescriptionError(blurHandler(e, false, 20, 300, false))
						}
					/>
					{Object.keys(descriptionError)[0] && (
						<Tooltip error={Object.keys(descriptionError)[0]} className="top" />
					)}
				</label>
			</form>
			{category && description && picture && (
				<Button onClick={handleCreateCategory}>Створити категорію</Button>
			)}
			{isOpen &&
				(isError ? (
					<ModalAlert
						closeClick={() => setIsOpen(false)}
						title="Error"
					>
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
