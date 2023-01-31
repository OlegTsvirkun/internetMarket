import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../UA_Components/Button";
import { Input } from "../../../UA_Components/Input";
import styles from "./EditGoodSearch.module.scss";
import {
	searchingGoods,
	searchingGoodsByArticul,
} from "../../../../store/categorySlice";
import { EDIT_LIST_ROUTE } from "../../../../utils/constRoutes";
import { ModalAlert } from "../../../ModalAlert/ModalAlert";

export const EditGoodSearch = ({}) => {
	const [searchArticul, setSearchArticul] = useState("");
	const [searchName, setSearchName] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { goods, isError, message } = useSelector((state) => state.category);


	const handleSearchByName = async () => {
		await dispatch(searchingGoods(`q=${searchName}`)).then((res) => {
			if (!res.error) {
				setSearchName('')
				navigate(EDIT_LIST_ROUTE);
			} else setIsModalOpen(true);
		});
	};
	const handleSearchByArticul = async () => {
		await dispatch(searchingGoodsByArticul(`articul=${searchArticul}`)).then(
			(res) => {
				if (!res.error) {
				setSearchArticul('')
					navigate(EDIT_LIST_ROUTE);
				} else setIsModalOpen(true);
			},
		);
	};

	return (
		<div className={styles.root}>
			<div className={styles.container}>
				<Input
					labelTitle="Знайти товар за артикулом"
					className={styles.searchInput}
					containerClassName={styles.InputContainer}
					name="articul"
					type="search"

					onChange={(e) => setSearchArticul(e.target.value)}
					onInput={(e) => setSearchArticul(e.target.value)}
					value={searchArticul}
					placeholder="Знайти товар за артикулом"
				></Input>
				<Button onClick={handleSearchByArticul} className={styles.searchButton}>
					&#9660;
				</Button>
				{/* </form> */}
			</div>

			<div className={styles.container}>
				<Input
					labelTitle="Знайти товар за назвою"
					className={styles.searchInput}
					containerClassName={styles.InputContainer}
					type="search"
					onChange={(e) => setSearchName(e.target.value)}
					onInput={(e) => setSearchName(e.target.value)}
					value={searchName}
					placeholder="Знайти товар за назвою"
				/>
				<Button className={styles.searchButton} onClick={handleSearchByName}>
					&#9660;
				</Button>
			</div>
			{isModalOpen && isError && (
				<ModalAlert
					closeClick={() => setIsModalOpen(false)}
					isErrorWindow={true}
					message={message ? message : "ERROR"}
				/>
			)}
		</div>
	);
};
