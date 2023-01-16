import React, { useCallback } from "react";
import { useState } from "react";
import { Button } from "../Button";
import { ContentWrapper } from "../ContentWrapper";
import { Input } from "../Input/Input";
import styles from "./CreateCategory.module.scss";
import axios from "../../axios";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { Link } from "react-router-dom";
export const CreateCategory = ({setNewCatIsOpen}) => {
	const [category, setCategory] = useState("");
	const [picture, setPicture] = useState(null);
	const [description, setDescription] = useState("");
	const [response, setResponse] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const createCategory = async (categoryData) => {
		const cat = await axios.post("/admin/create-category", categoryData);
		return cat.data;
	};
	const handleCreatePlane = useCallback(
		async (e) => {
			e.preventDefault();
			// console.log(picture);
			const formData = new FormData();
			formData.append("category", category);
			formData.append("description", description);
			formData.append("picture", picture);
			await createCategory(formData)
			.then(res=>{
				if(!res.error){
					setResponse(res)
					setIsOpen(!isOpen);
			      }
			})
		},
		[category, description, picture],
	);

	return (
		<ContentWrapper className={styles.createCategory}>
			<h1 className={styles.createCategory__title}>Нова категорія</h1>
			<form>
				<div className={styles.createCategory__container}>
					<div className={styles.createCategory__containerInputs}>
						<label>
							Введіть назву{" "}
							<Input
								className={styles.createCategory__input}
								name="category"
								type="text"
								placeholder="Назва категорії"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								onInput={(e) => setCategory(e.target.value)}
							/>
						</label>
						<label>
							Виберіть зображення
							<Input
								onChange={(e) => setPicture(e.target.files[0])}
								name="picture"
								type="file"
							/>
							{/* <input  type="file" name="picture" id="" onChange={(e) => setPicture(e.target.files[0])} /> */}
						</label>
					
					</div>
					<img className={styles.createCategory__img} src={null} alt="" />
				</div>
			<label className={styles.createCategory__description} > Опис:
					<textarea
						value={description}
						name="description"
						placeholder="Опис категорії"
						onChange={(e) => setDescription(e.target.value)}
					/>
			</label>
			</form>
			<Button  onClick={handleCreatePlane}>Створити категорію</Button>
			{isOpen && (
				<div className={styles.createCategory__modal}>
					<div className={styles.createCategory__modalMessege}>
						<p>{response?.response}</p>
					</div>
					<Button onClick={()=>setNewCatIsOpen(false)}>Back</Button>
				</div>
			)}
			{isOpen && <ModalWindow />}
		</ContentWrapper>
	);
};
