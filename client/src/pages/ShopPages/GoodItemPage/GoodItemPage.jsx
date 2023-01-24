import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGood } from "../../../store/goodSlice";
import { ContentWrapper } from "../../../components/UA_Components/ContentWrapper/ContentWrapper";
import { Button } from "../../../components/UA_Components/Button";
import { BsX } from "react-icons/bs";
import { priceFormating } from "../../../utils/priceFormating";
import { GoodBuy } from "../../../components/GoodBuy";
import styles from "./GoodItemPage.module.scss";
import { Carousel } from "../../../components/UA_Components/Carousel/Carousel";
import { Modal } from "../../../components/Modal/Modal";
import { ModalWindow } from "../../../components/ModalWindow";
import { GoodItem } from "../../../components/GoodContent/GoodItem/GoodItem";

export const GoodItemPage = ({}) => {
	const [searchParams, setSearchParams] = useSearchParams();
	

	const queryParams = searchParams.get("id");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getGood(queryParams));
	}, [dispatch, queryParams]);


	return (
		
			<ContentWrapper className={styles.goodItem}>
				<Button
					className={styles.goodItem__backButton}
					onClick={() => navigate(-1)}
					isBackButton={true}
				>
					Назад
				</Button>
				<GoodItem />
		
			</ContentWrapper>
		)
	
};
