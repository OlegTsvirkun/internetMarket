import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../Button";
import { Input } from "../Input/Input";
import styles from "./UpdateGood.module.scss";
import { removeGood, searchingGoods, searchingGoodsByArticul } from "../../store/categorySlice";
import { priceFormating } from "../../hooks";
import { DeleteWithBtn } from "../DeleteWithBtn/DeleteWithBtn";
import services from "../../store/services/service";

export const UpdateGood = ({}) => {
	const [searchArticul, setSearchArticul] = useState("");
	const [searchName, setSearchName] = useState("");
	const [itemGoods, setItemGoods] = useState({});
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const searchParams = useSearchParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isLoading, goods } = useSelector((state) => state.category);
	useEffect(() => {
		setItemGoods({ ...goods });
		//  navigate(`/admin-create?${searchParams}`)
	}, [dispatch, goods]);
	console.log(itemGoods);
	const handleRemoveGood = (id) => {
    services.removeGood({id: id})
    .then(res=>{
      if(!res.error){
        console.log(res);
        dispatch(removeGood(id))
      }
    }
    )
    .catch(err=>{
			if (err.response) {
						console.log(err.response.data);
		}})

  };
	return (
		<div className={styles.updateGood}>
			<div className={styles.updateGood__searchContainer}>
				<label>
					Знайти товар за артикулом
					<div className={styles.searchContainer__container}>
						{/* <form ation='GET' > */}

						<Input
							className={styles.updateGood__searchInput}
							name="articul"
							onChange={(e) => setSearchArticul(e.target.value)}
							onInput={(e) => setSearchArticul(e.target.value)}
							value={searchArticul}
							placeholder="Знайти товар за артикулом"
						/>
						<Button
							onClick={() =>
								dispatch(searchingGoodsByArticul(`articul=${searchArticul}`))
							}
							// type= 'submit'
							className={styles.searchContainer__searchButton}
						>
							&#9660;
						</Button>
						{/* </form> */}
					</div>
				</label>
				<label>
					Знайти товар за назвою
					<div className={styles.searchContainer__container}>
						<Input
							className={styles.updateGood__searchInput}
              type='search'
							onChange={(e) => setSearchName(e.target.value)}
							onInput={(e) => setSearchName(e.target.value)}
							value={searchName}
							placeholder="Знайти товар за назвою"
						/>
						<Button
							//  containerClassName={styles.searchContainer__searchButtonContainer}
							className={styles.searchContainer__searchButton}
              onClick = {()=>dispatch(searchingGoods(`q=${searchName}`))}
						>
							&#9660;
						</Button>
					</div>
				</label>
			</div>

			{!isLoading && (
				<div className={styles.updateGood__goodList}>
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
								src={process.env.REACT_APP_API_URL +itemGoods[item].picture}
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
			)}
		</div>
	);
};
