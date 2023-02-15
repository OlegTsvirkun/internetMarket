import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../UA_Components/Button";
import { Input } from "../../../UA_Components/Input";
import styles from "./EditGoodSearch.module.scss";
import {
	removeGood,
	searchingGoods,
	searchingGoodsByArticul,
} from "../../../../store/slices/categorySlice";
import { priceFormating } from "../../../../utils/priceFormating";
import { DeleteWithBtn } from "../../DeleteWithBtn/DeleteWithBtn";
import services from "../../../../store/services/service";
import { ADMIN_ROUTE, EDIT_GOOD_ROUTE } from "../../../../utils/constRoutes";
import { ModalAlert } from "../../../AdditionalComponents/ModalAlert/ModalAlert";

export const EditGoodSearch = ({}) => {
	const [searchArticul, setSearchArticul] = useState("");
	const [searchName, setSearchName] = useState("");
	const [itemGoods, setItemGoods] = useState({});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoading, goods, isError, message } = useSelector(
		(state) => state.category,
	);
	// useEffect(() => {
	// 	navigate(EDIT_GOOD_ROUTE)

	// 	return () => {
	// 	navigate(ADMIN_ROUTE)

	// 	};
	// }, []);
	useEffect(() => {
		setItemGoods({ ...goods });
		//  navigate(`/admin-create?${searchParams}`)
	}, [dispatch, goods]);
	// console.log(itemGoods);

	const handleSearchByName = async () => {
		await dispatch(searchingGoodsByArticul(`articul=${searchArticul}`)).then(
			(res) => {
				if (!res.error) {
					navigate(EDIT_GOOD_ROUTE);
				}
				setIsModalOpen(true);
			},
		);
	};
	const handleSearchByArticul = async() => {
		await dispatch(searchingGoods(`q=${searchName}`));
	};

	// const handleRemoveGood = (id) => {
	// 	services
	// 		.removeGood({ id: id })
	// 		.then((res) => {
	// 			if (!res.error) {
	// 				console.log(res);
	// 				dispatch(removeGood(id));
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			if (err.response) {
	// 				console.log(err.response.data);
	// 			}
	// 		});
	// };
	return (
		<div className={styles.updateGood}>
			<div className={styles.searchContainer}>
				<label>
					Знайти товар за артикулом
					<div className={styles.container}>
						{/* <form ation='GET' > */}

						<Input
							className={styles.searchInput}
							name="articul"
							onChange={(e) => setSearchArticul(e.target.value)}
							onInput={(e) => setSearchArticul(e.target.value)}
							value={searchArticul}
							placeholder="Знайти товар за артикулом"
						/>
						<Button
							onClick={handleSearchByArticul}
							className={styles.searchButton}
						>
							&#9660;
						</Button>
						{/* </form> */}
					</div>
				</label>
				<label>
					Знайти товар за назвою
					<div className={styles.container}>
						<Input
							className={styles.searchInput}
							type="search"
							onChange={(e) => setSearchName(e.target.value)}
							onInput={(e) => setSearchName(e.target.value)}
							value={searchName}
							placeholder="Знайти товар за назвою"
						/>
						<Button
							className={styles.searchButton}
							onClick={handleSearchByName}
						>
							&#9660;
						</Button>
					</div>
				</label>
			</div>
			{isModalOpen && isError && (
				<ModalAlert
				
				closeClick={()=>setIsModalOpen(false)}
					isErrorWindow={true}
					message={message ? message : "ERROR"}
				/>
			)}
			{/* {!isLoading && (
				<div className={styles.goodList}>
					{Object.keys(itemGoods).map((item, i) => (
						<div className={styles.goodList__goodItem} key={i}>
							<div>
								<p>Назва товару: {itemGoods[item].name}</p>
								<p>Артикул: {itemGoods[item].articul}</p>
								<p>Ціна: {priceFormating(itemGoods[item].price)} грн.</p>
								<div className={styles.goodList__buttons}>
									<Button
										className={styles.goodList__buttonCorrect}
										onClick={() =>
											navigate(`/admin/edit-good?id=${itemGoods[item]._id}`)
										}
									>
										Змінити товар
									</Button>
									<Button
										className={styles.goodList__buttonDelete}
										onClick={() => setIsDeleteOpen(true)}
										// onClick={() => handleRemoveGood(itemGoods[item]._id)}
									>
										Видалити товар
									</Button>
								</div>
							</div>
							<img
								className={styles.goodList__goodImage}
								src={process.env.REACT_APP_API_URL + itemGoods[item].picture}
							/>
							{isDeleteOpen && (
								<DeleteWithBtn
									onClickNo={() => setIsDeleteOpen(false)}
									onClickYes={() => handleRemoveGood(itemGoods[item]._id)}
								/>
							)}
						</div>
					))}
				</div>
			)} */}
		</div>
	);
};
