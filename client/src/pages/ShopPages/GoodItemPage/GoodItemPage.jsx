import React, { useEffect } from "react";
import {  useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGood } from "../../../store/goodSlice";
import { ContentWrapper } from "../../../components/UA_Components/ContentWrapper/ContentWrapper";
import styles from "./GoodItemPage.module.scss";
import { GoodItem } from "../../../components/GoodContent/GoodItem/GoodItem";
import { BackNavigate } from "../../../components/AdditionalComponents/BackNavigate/BackNavigate";

export const GoodItemPage = ({}) => {
	const [searchParams] = useSearchParams();

	const queryParams = searchParams.get("id");
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getGood(queryParams));
	}, [dispatch, queryParams]);

	return (
		<ContentWrapper className={styles.goodItem}>
			<BackNavigate/>
			<GoodItem />
		</ContentWrapper>
	);
};
