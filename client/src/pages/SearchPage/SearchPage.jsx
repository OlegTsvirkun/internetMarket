import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ContentWrapper } from "../../components/ContentWrapper";
import { Goods } from "../../components/Goods";
import { Button } from "../../components/Button";
import { searchingGoods } from "../../store/categorySlice";
import styles from "./SearchPage.module.scss";
import { ErrorComponent } from "../../components/Error";

export const SearchPage = ({}) => {
	const [searchParams, setSearchParams] = useSearchParams();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	//!

	const url = useLocation();
	const { goods, total, isLoading,isError,message } = useSelector((state) => state.category);

	useEffect(() => {
		if (!searchParams.get("limit")) searchParams.set("limit", 3);
		if (!searchParams.get("page")) searchParams.set("page", 1);
		dispatch(searchingGoods(searchParams.toString()));
		navigate(url.pathname + "?" + searchParams.toString());
	}, []);

	useEffect(() => {
		dispatch(searchingGoods(searchParams.toString()));
		navigate(url.pathname + "?" + searchParams.toString());
	}, [searchParams]);

  if(isError) return <ErrorComponent>{message}</ErrorComponent>
	return (
		<div className={styles.searchPage}>
			<ContentWrapper className={styles.backButton}>
				<Button onClick={() => navigate(-1)} isBackButton={true}>
					Назад
				</Button>
			</ContentWrapper>
      
			{!Object.keys(goods)[0] && <div>Товар з такою назвою відсутній</div>}
			{isLoading ? (
				<div className="Skeleton">Loading...</div>
			) : (
				(!isError && Object.keys(goods)[0]) && <Goods total={total} goods={goods} />
			)}
		</div>
	);
};
