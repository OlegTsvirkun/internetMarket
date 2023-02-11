import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Button } from "../../components/UA_Components/Button/Button";
import { ContentWrapper } from "../../components/UA_Components/ContentWrapper/ContentWrapper";
import { EditGoodSearch } from "../../components/AdminsComponents/EditComponents/EditGoodSearch/EditGoodSearch";
import { cleanupCatSlice } from "../../store/categorySlice";
import {
	CREATE_CATEGORY_ROUTE,
	CREATE_GOOD_ROUTE,
	EDIT_GOOD_ROUTE,
	EDIT_LIST_ROUTE,
	EDIT_ROUTE,
} from "../../utils/constRoutes";
import { EditGoodComponent } from "../../components/AdminsComponents/EditComponents/EditGoodComponent/EditGoodComponent";
import { CreateCategory } from "../../components/AdminsComponents/CreateCategory";
import { CreateGood } from "../../components/AdminsComponents/CreateGood";
import { EditListGoods } from "../../components/AdminsComponents/EditComponents/EditListGoods/EditListGoods";
import { ModalBackground } from "../../components/AdditionalComponents/ModalBackground/ModalBackground";
import { FailPage } from "../FailPage";
import { Spinner } from "../../components/UA_Components/Spinner/Spinner";
import styles from "./AdminPage.module.scss";
const ButtonsList = {
	"create-category": "Створити категорію",
	"create-good": "Створити товар",
	"edit": "Змінити товар",
};

export const AdminPage = ({ isLoading, role }) => {
	const dispatch = useDispatch();
	const location = useLocation();

	const url = location.pathname;
	useEffect(() => {
		dispatch(cleanupCatSlice());
	}, []);
	if (isLoading)
		return (
			<ContentWrapper className={styles.spinner}>
				<Spinner /> <ModalBackground />
			</ContentWrapper>
		);
	if (!role.includes("ADMIN") && !isLoading) return <FailPage />;
	return (
		<ContentWrapper>
			<div className={styles.adminPage}>
				<div className={styles.buttonContainer}>
					{Object.keys(ButtonsList).map((route) => (
						<Link
							key={route}
							to={route}
							
							className={`${styles.button} ${
								url.includes(route) ? styles.active : ""
							}`}
						>
							{ButtonsList[route]}
						</Link>
					))}

					{url.includes(EDIT_ROUTE) && <EditGoodSearch />}
				</div>
				{/* // !------------------------------------------------------------------------------------- */}
				<div className={styles.pages}>
					<Routes>
						<Route
							exact
							path={CREATE_CATEGORY_ROUTE}
							element={<CreateCategory />}
						/>
						<Route exact path={CREATE_GOOD_ROUTE} element={<CreateGood />} />
						<Route exact path={EDIT_LIST_ROUTE} element={<EditListGoods />} />
						<Route
							exact
							path={EDIT_GOOD_ROUTE}
							element={<EditGoodComponent />}
						/>
					</Routes>
				</div>
			</div>
		</ContentWrapper>
	);
};
