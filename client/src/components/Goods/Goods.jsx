import React, { useEffect, useState } from "react";
import {
	useSearchParams,
} from "react-router-dom";
import { ContentWrapper } from "../ContentWrapper";
import { GoodCard } from "../GoodCard";
import { LimitCards } from "../LimitCards/LimitCards";
import { Pagination } from "../Pagination/Pagination";
import styles from "./Goods.module.scss";

export const Goods = ({ goods, total }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentPage, setCurrentPage] = useState();
	const [cardsLimit, setCardsLimit] = useState();
	let totalPages = Math.ceil(total / cardsLimit);
	useEffect(() => {
		searchParams.get("page")
			? setCurrentPage(+searchParams.get("page"))
			: setCurrentPage(1);
		searchParams.get("limit")
			? setCardsLimit(+searchParams.get("limit"))
			: setCardsLimit(3);
	}, []);

	return (
		<>
			<ContentWrapper>
				{" "}
				{cardsLimit && (
					<LimitCards
						value={cardsLimit}
						setValue={setCardsLimit}
						total={total}
						setCurrentPage={setCurrentPage}
					/>
				)}
			</ContentWrapper>

			<ContentWrapper className={styles.goodsGrid}>
				{Object.keys(goods).map((item) => {
					return <GoodCard key={goods[item]["_id"]} {...goods[item]} />;
				})}
			</ContentWrapper>
			{totalPages && (
				<Pagination
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					totalPages={totalPages}
					className={styles.pagination}
					classNameActive
					classNameCurPage
				/>
			)}
		</>
	);
};
