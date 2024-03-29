import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getGood } from "../../../../store/slices/goodSlice";
import { ModalBackground } from "../../../AdditionalComponents/ModalBackground/ModalBackground";
import { Spinner } from "../../../UA_Components/Spinner/Spinner";
import { EditGoodItem } from "../EditGoodItem/EditGoodItem";
import styles from "./EditGoodComponent.module.scss";

export const EditGoodComponent = ({}) => {
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const { good, images, isLoading } = useSelector((state) => state.good);
	useEffect(() => {
		if (searchParams.get("id")) dispatch(getGood(searchParams.get("id")));
	}, []);

	if (isLoading)
		return (
			<>
				<ModalBackground /> <Spinner className={styles.spiner} />
			</>
		);
	return (
		<>
			<EditGoodItem
				id={good._id}
				_category={good.category?.category}
				_name={good.name}
				_articul={good.articul}
				_price={good.price}
				_picture={good.picture}
				_images={images}
				_description={good.description}
			/>
		</>
	);
};
