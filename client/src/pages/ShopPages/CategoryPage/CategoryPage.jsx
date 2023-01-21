import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import { ContentWrapper } from "../../../components/ContentWrapper";
import { Goods } from "../../../components/Goods";
import { Button } from "../../../components/Button";
import { getCategory } from "../../../store/categorySlice";
import styles from "./CategoryPage.module.scss";

export const CategoryPage = ({}) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const url = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { goods, total, isLoading ,catDescription} = useSelector((state) => state.category);

	useEffect(() => {
		if (!searchParams.get("limit")) searchParams.set("limit", 3);
		if (!searchParams.get("page")) searchParams.set("page", 1);
		dispatch(
			getCategory(
				url.pathname.split("/").slice(-1) + "?" + searchParams.toString(),
			),
		);
		navigate(url.pathname + "?" + searchParams.toString());
	}, []);

	useEffect(() => {
		dispatch(
			getCategory(
				url.pathname.split("/").slice(-1) + "?" + searchParams.toString(),
			),
		);
		navigate(url.pathname + "?" + searchParams.toString());
	}, [
		searchParams,
	]);

	if (isLoading) return <div>Loaadiing...</div>;

	return (
		<div className={styles.categoryPage}>
			<ContentWrapper className={styles.backButton}>
				<Button onClick={() => navigate('/')} isBackButton={true}>
					Назад
				</Button>
			</ContentWrapper>
			<ContentWrapper className={styles.categoryPage}>
				{goods && total && (
					<Goods
						goods={goods}
						total={total}
					/>
				)}
			</ContentWrapper>
			<ContentWrapper>
<p className={styles.categoryPage__description}>{catDescription[0]}</p>
		</ContentWrapper>
		</div>
	);
};
