import styles from "./CreateCategory.module.scss";

import React, { useCallback } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContentWrapper } from "../../components/ContentWrapper";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button";
import adminServices from "../../store/services/adminServices";

export const CreateCategory = ({}) => {
	const [category, setCategory] = useState("");
	const [picture, setPicture] = useState(null);
	const [description, setDescription] = useState("");
	const [response, setResponse] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const handleCreateCategory = useCallback(
		async (e) => {
			e.preventDefault();
			// console.log(picture);
			const formData = new FormData();
			formData.append("category", category);
			formData.append("description", description);
			formData.append("picture", picture);
			await adminServices.createCategory(formData).then((res) => {
				if (!res.error) {
					setResponse(res);
					setIsOpen(!isOpen);
				}
			});
		},
		[category, description, picture],
	);
	return (
		<>
			<h1 className={styles.createCategory__title}>Нова категорія</h1>
			<form>
				<div className={styles.createCategory__container}>
					<div className={styles.createCategory__containerInputs}>
						<Input
							labelTitle="Введіть назву"
							className={styles.createCategory__input}
							name="category"
							type="text"
							placeholder="Назва категорії"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							onInput={(e) => setCategory(e.target.value)}
						/>

						<Input
							labelTitle="Виберіть зображення"
							onChange={(e) => setPicture(e.target.files[0])}
							name="picture"
							type="file"
						/>
					</div>
					<img className={styles.createCategory__img} src={null} alt="" />
				</div>
				<label className={styles.createCategory__description}>
					{" "}
					Опис:
					<textarea
						value={description}
						name="description"
						placeholder="Опис категорії"
						onChange={(e) => setDescription(e.target.value)}
					/>
				</label>
			</form>
			<Button onClick={handleCreateCategory}>Створити категорію</Button>
			{isOpen && (
				<div className={styles.createCategory__modal}>
					<div className={styles.createCategory__modalMessege}>
						<p>{response?.response}</p>
					</div>
					<Button onClick={() => setNewCatIsOpen(false)}>Back</Button>
				</div>
			)}
			{isOpen && <ModalWindow />}
		</>
	);
};
