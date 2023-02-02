import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Button } from "../../components/UA_Components/Button/Button";
import { ContentWrapper } from "../../components/UA_Components/ContentWrapper/ContentWrapper";
import {
	EditGoodSearch,
} from "../../components/AdminsComponents/EditComponents/EditGoodSearch/EditGoodSearch";
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
import { CreateGood_ } from "../../components/AdminsComponents/CreateGood";
import { EditListGoods } from "../../components/AdminsComponents/EditComponents/EditListGoods/EditListGoods";
import { ModalBackground } from "../../components/AdditionalComponents/ModalBackground/ModalBackground";
import { FailPage } from "../FailPage";
import { Spinner } from "../../components/UA_Components/Spinner/Spinner";
import styles from "./AdminPage.module.scss";

export const AdminPage = ({isLoading,role}) => {
	const [updateGoodIsOpen, setUpdateGoodIsOpen] = useState(false);
	const dispatch = useDispatch();
	const location =useLocation()

	const url = location.pathname
	useEffect(() => {
		dispatch(cleanupCatSlice());
	}, []);
	if(isLoading) return<ContentWrapper className={styles.spinner}><Spinner  /> <ModalBackground/></ContentWrapper>
	if(!role.includes("ADMIN") && !isLoading ) return <FailPage/>
	return (
		<ContentWrapper>
			<div className={styles.adminPage}>
				<div className={styles.buttonContainer}>
					<Link to={CREATE_CATEGORY_ROUTE}>
						<Button isOrangeButton={url.includes(CREATE_CATEGORY_ROUTE)?true:false} className={styles.button}
						onClick={() => {
							setUpdateGoodIsOpen(false);
						}}
						>Створити категорію</Button>
					</Link>

					<Link to={CREATE_GOOD_ROUTE}>
						<Button isOrangeButton={url.includes(CREATE_GOOD_ROUTE)?true:false} className={styles.button}	onClick={() => {
							setUpdateGoodIsOpen(false);
						}} >Створити товар</Button>
					</Link>
					<Link to ={EDIT_ROUTE}>
						<Button
						isOrangeButton={url.includes(EDIT_ROUTE)?true:false}
							className={styles.button}
							onClick={() => {
								setUpdateGoodIsOpen(!updateGoodIsOpen);
							}}
						>
							Змінити товар
						</Button>
					</Link>
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
						<Route
							exact
							path={CREATE_GOOD_ROUTE}
							element={<CreateGood_/>}
						/>
						<Route exact path={EDIT_LIST_ROUTE} element={<EditListGoods />} />
						<Route exact path={EDIT_GOOD_ROUTE} element={<EditGoodComponent />} />
					</Routes>
				</div>

			</div>
		</ContentWrapper>
	);
};
