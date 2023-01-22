import React, { useEffect, useState } from "react";
import {
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import { ContentWrapper } from "../UA_Components/ContentWrapper";
import { GoodCard } from "../GoodCard";
import { LimitCards } from "../LimitCards/LimitCards";
import { Pagination } from "../Pagination/Pagination";
import styles from "./Goods.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { cleanupCatSlice, getCategory } from "../../store/categorySlice";
import ReactPaginate from "react-paginate";
import { Paginate } from "../UA_Components/Paginate/Paginate";

export const Goods = ({ }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [currentPage, setCurrentPage] = useState(1);
	const [cardsLimit, setCardsLimit] = useState(3);
	const dispatch = useDispatch();
	const { goods, total, isLoading ,catDescription,curPage,limit} = useSelector((state) => state.category);
	const url = useLocation();
	const navigate = useNavigate();
	let totalPages = Math.ceil(total / cardsLimit||3) ;

	
	if (isLoading) return <div>Loaadiing...</div>;
	return (
		<>
			

			<ContentWrapper className={styles.goodsGrid}>
				{Object.keys(goods).map((item) => {
					return <GoodCard key={goods[item]["_id"]} {...goods[item]} />;
				})}
			</ContentWrapper>
			{/* {totalPages && (
				<Pagination
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					totalPages={totalPages}
					className={styles.pagination}
					classNameActive
					classNameCurPage
				/>
			)} */}
		{/* <Paginate/> */}

		</>
	);
};
