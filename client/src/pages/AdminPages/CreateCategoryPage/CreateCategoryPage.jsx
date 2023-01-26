// import { CreateCategory } from '../../../components/CreateCategory/CreateCategory';
import styles from "./CreateCategoryPage.module.scss";

import React, { useCallback } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContentWrapper } from "../../../components/UA_Components/ContentWrapper";
import { Button } from "../../../components/UA_Components/Button";
import adminServices from "../../../store/services/adminServices";
import { CreateCategory } from "../../../components/AdminsComponents/CreateCategory";

export const CreateCategoryPage = ({}) => {
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
		<ContentWrapper className={styles.createCategory}>
			<Button
				className={styles.goodItem__backButton}
				onClick={() => navigate(-1)}
				isBackButton={true}
			>
				Назад
			</Button>
			<CreateCategory/>
		</ContentWrapper>
	);
};
