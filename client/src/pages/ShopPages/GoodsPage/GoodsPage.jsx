import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { FailPage } from "../../FailPage";
import {
	getCategory,
	searchingGoods,
} from "../../../store/categorySlice";
import styles from "./GoodsPage.module.scss";
import { ContentWrapper } from "../../../components/UA_Components/ContentWrapper";
import { Paginate } from "../../../components/UA_Components/Paginate/Paginate";
import { LimitCards } from "../../../components/UA_Components/LimitCards/LimitCards";
import { useRef } from "react";
import { Goods } from "../../../components/GoodsContent/Goods/Goods";
import { BackNavigate } from "../../../components/AdditionalComponents/BackNavigate/BackNavigate";

export const GoodsPage = ({}) => {
	const [searchParams] = useSearchParams();
	const url = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isMounted = useRef(false);
	const isSearch = useRef(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [cardsLimit, setCardsLimit] = useState(3);
	const {
		total,
		isLoading,
		catDescription,
		isError,
		message,
	} = useSelector((state) => state.category);
	let totalPages = Math.ceil(total / cardsLimit || 3);

	useEffect(() => {
		if (searchParams.toString()) {
			const page = searchParams.get("page");
			const limit = searchParams.get("limit");
			const q = searchParams.get("q");
			if (url.pathname == "/search") {
				dispatch(searchingGoods(`q=${q}&page=${page}&limit=${limit}`));
			} else {
				dispatch(
					getCategory(
						`${url.pathname.split("/").slice(-1)}?page=${page}&limit=${limit}`,
					),
				);
			}
			isSearch.current = true;
		}
	}, []);

	useEffect(() => {
		searchParams.set("page", currentPage);
		searchParams.set("limit", cardsLimit);
		const q = searchParams.get("q") || "";
		if (!isSearch.current) {
			if (url.pathname == "/search") {
				dispatch(
					searchingGoods(`q=${q}&page=${currentPage}&limit=${cardsLimit}`),
				);
			} else
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
		if (isMounted.current) {
			const page = searchParams.get("page");
			const limit = searchParams.get("limit");
			const q = searchParams.get("q") || "";

			if (url.pathname == "/search") {
				navigate(`?q=${q}&page=${page}&limit=${limit}`);
			} else navigate(`?page=${page}&limit=${limit}`);
		}
		isMounted.current = true;
	}, [currentPage, cardsLimit]);

	// if (isLoading) return <div>Loading...</div>;
	if (isError) return <FailPage message={message} />;
	return (
		<ContentWrapper>
				<BackNavigate />
				<LimitCards
					cardsLimit={cardsLimit || 3}
					setCardsLimit={setCardsLimit}
					total={total || 3}
					setCurrentPage={setCurrentPage}
				/>
				<Goods cardsLimit ={cardsLimit} />
				<Paginate
					onChange={(n) => setCurrentPage(n)}
					totalPages={totalPages || 1}
					forcePage={currentPage - 1}
				/>
				<p className={styles.description}>{catDescription[0]}</p>
		</ContentWrapper>
	);
};
