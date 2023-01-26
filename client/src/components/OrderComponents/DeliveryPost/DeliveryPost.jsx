import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addError,
	remooveError,
} from "../../../store/orderSlice";
import {  valueValidator } from "../../../utils/validator";
import { Input } from "../../UA_Components/Input/Input";
import { Tooltip } from "../../Tooltip/Tooltip";
// import { input } from '../../UA_Components/Input/Input';
import styles from "./DeliveryPost.module.scss";

export const DeliveryPost = ({}) => {
	const [post, setPost] = useState("");
	const [cityDelivery, setCityDelivery] = useState("");
	const [postError, setPostError] = useState({});
	const [cityDeliveryError, setCityDeliveryError] = useState({});
	const { itemsInOrder } = useSelector((state) => state.order);
	const dispatch = useDispatch();
	useEffect(() => {
		let errorsObj = {
			city: true,
			postNP: true,
		};
		dispatch(addError(errorsObj));
		return () => {
			dispatch(remooveError(errorsObj));
		};
	}, []);
	const blurHandler = (
		e,
		onlyText = true,
		minValue = 3,
		maxValue = 40,
		empty = false,
	) => {
		let obj = {};
		obj = valueValidator(e, onlyText, minValue, maxValue, empty);
		if (Object.keys(obj)[0]) {
			dispatch(addError({ [e.target.name]: true }));
		} else {
			dispatch(remooveError({ [e.target.name]: false }));
			dispatch(addOrderDeliveryData( {[e.target.name]:e.target.value}))

		}
		return obj;
	};
	return (
		<div className={styles.deliveryPost}>
			<Input
			className={styles.city}
containerClassName={styles.cityContainer}
				labelTitle="Ваше місто:"
				type="text"
				name="city"
				placeholder="Місто"
				onChange={(e) => {
					setCityDelivery(e.target.value);
				}}
				value={cityDelivery}
				onBlur={(e) => setCityDeliveryError(blurHandler(e))}
				onInput={(e) => setCityDeliveryError(blurHandler(e))}
			>
			{Object.keys(cityDeliveryError)[0] && (
				<Tooltip
					error={Object.keys(cityDeliveryError)[0]}
					className={"right"}
				/>
			)}
			</Input>

			<Input
			className={styles.postN}
containerClassName={styles.postNContainer}

				id="postNP"
				type="number"
				name="postNP"
				labelTitle="Відділення НП"
				placeholder="№"
				onChange={(e) => {
					setPost(e.target.value);
				}}
				value={post}
				onBlur={(e) => setPostError(blurHandler(e,false,1))}
				onInput={(e) => setPostError(blurHandler(e,false,1))}
			>
			{Object.keys(postError)[0] && (
				<Tooltip error={Object.keys(postError)[0]} className={"bottom"} />
			)}
			</Input>

		</div>
	);
};