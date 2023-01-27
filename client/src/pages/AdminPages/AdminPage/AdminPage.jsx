import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Button } from "../../../components/UA_Components/Button";
import { ContentWrapper } from "../../../components/UA_Components/ContentWrapper/";

import { CreateGood, CreateGoodPage } from "../CreateGoodPage/CreateGoodPage";
import {
	SearchForUpdateGood,
	UpdateGood,
} from "../../../components/AdminsComponents/UpdateGood/SearchForUpdateGood";
import { cleanupCatSlice } from "../../../store/categorySlice";
import {
	CREATE_CATEGORY_ROUTE,
	CREATE_GOOD_ROUTE,
	EDIT_GOOD_ROUTE,
} from "../../../utils/constRoutes";
import styles from "./AdminPage.module.scss";
import { EditGoodPage } from "../EditGoodPage/EditGoodPage";
import { CreateCategory } from "../../../components/AdminsComponents/CreateCategory";

export const AdminPage = ({}) => {
	const [updateGoodIsOpen, setUpdateGoodIsOpen] = useState(false);
	const dispatch = useDispatch();
	const location =useLocation()

	const url = location.pathname
	console.log();
	useEffect(() => {
		dispatch(cleanupCatSlice());
	}, []);
	return (
		<ContentWrapper>
			<div className={styles.adminPage}>
				<div className={styles.buttonContainer}>
					<Link to={CREATE_CATEGORY_ROUTE}>
						<Button isOrangeButton={url.includes(CREATE_CATEGORY_ROUTE)?true:false} className={styles.button}>Створити категорію</Button>
					</Link>

					<Link to={CREATE_GOOD_ROUTE}>
						<Button isOrangeButton={url.includes(CREATE_GOOD_ROUTE)?true:false} className={styles.button}>Створити товар</Button>
					</Link>
					<Button
					// isOrangeButton={url.includes(CREATE_GOOD_ROUTE)?true:false}
						className={styles.button}
						onClick={() => {
							setUpdateGoodIsOpen(!updateGoodIsOpen);
						}}
					>
						Змінити товар
					</Button>
				</div>
				<div className={styles.pages}>
					<Routes>
						<Route
							exact
							path={CREATE_CATEGORY_ROUTE}
							element={<CreateCategory />}
						/>
						<Route
							exact
							path={CREATE_GOOD_ROUTE}
							element={<CreateGoodPage />}
						/>
						<Route exact path={EDIT_GOOD_ROUTE} element={<EditGoodPage />} />
					</Routes>
				</div>

				{updateGoodIsOpen && <SearchForUpdateGood />}
			</div>
		</ContentWrapper>
	);
};
