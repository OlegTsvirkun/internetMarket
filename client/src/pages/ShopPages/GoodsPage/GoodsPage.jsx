import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Goods } from "../../../components/Goods";
import {FailPage} from '../../FailPage'
import {
	cleanupCatSlice,
	getCategory,
	setCurPage,
} from "../../../store/categorySlice";
import styles from "./GoodsPage.module.scss";
import { ContentWrapper } from "../../../components/UA_Components/ContentWrapper";
import { Button } from "../../../components/UA_Components/Button";
import { Paginate } from "../../../components/UA_Components/Paginate/Paginate";
import { GoodCard } from "../../../components/GoodCard";
import { LimitCards } from "../../../components/LimitCards/LimitCards";
import { useRef } from "react";

export const GoodsPage = ({}) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const url = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isMounted = useRef(false);
	const isSearch = useRef(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [cardsLimit, setCardsLimit] = useState(3);
	const { goods, total, isLoading, catDescription, curPage, limit, isError,message } =
		useSelector((state) => state.category);
	let totalPages = Math.ceil(total / cardsLimit || 3);

	useEffect(() => {
		if (searchParams.toString()) {
			const page = searchParams.get("page");
			const limit = searchParams.get("limit");
			dispatch(
				getCategory(
					`${url.pathname.split("/").slice(-1)}?page=${page}&limit=${limit}`,
				),
			);
			isSearch.current = true;
		}
	}, []);

	useEffect(() => {
		searchParams.set("page", currentPage);
		searchParams.set("limit", cardsLimit);
		if (!isSearch.current) {
			dispatch(
				getCategory(
					`${url.pathname
						.split("/")
						.slice(-1)}?page=${currentPage}&limit=${cardsLimit}`,
				),
			);
		}
		isSearch.current = false;
	}, [currentPage, cardsLimit, url]);
	useEffect(() => {
		// console.log(isMounted.current, "isMounted.current");
		if (isMounted.current) {
			const page = searchParams.get("page");
			const limit = searchParams.get("limit");
			navigate(`?page=${page}&limit=${limit}`);
		}
		isMounted.current = true;
	}, [currentPage, cardsLimit]);

	if(isLoading) return <div>Loading...</div>
if(isError) return <FailPage message={message} />
	return (
		<div className={styles.goodsPage}>
			<ContentWrapper className={styles.backButton}>
				<Button onClick={() => navigate(-1)} isBackButton={true}>
					Назад
				</Button>
				<LimitCards
					cardsLimit={cardsLimit}
					setCardsLimit={setCardsLimit}
					total={total}
					setCurrentPage={setCurrentPage}
				/>
			</ContentWrapper>
			<ContentWrapper></ContentWrapper>
			<ContentWrapper className={styles.categoryPage}>
				<Goods />
			</ContentWrapper>
			<Paginate
				onChange={(n) => setCurrentPage(n)}
				totalPages={totalPages}
				forcePage={currentPage - 1}
			/>
			<ContentWrapper>
				<p className={styles.categoryPage__description}>{catDescription[0]}</p>
			</ContentWrapper>
		</div>
	);
};
