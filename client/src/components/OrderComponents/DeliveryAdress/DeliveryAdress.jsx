import React, { useEffect, useState } from "react";
// import { input } from '../../UA_Components/Input/Input';
import styles from "./DeliveryAdress.module.scss";
import { typeValidator, valueValidator } from "../../../utils/validator";
import { Tooltip } from "../../AdditionalComponents/Tooltip/Tooltip";
import { useDispatch } from "react-redux";
import {
	addError,
	addOrderDeliveryData,
	remooveError,
} from "../../../store/orderSlice";
import { Input } from "../../UA_Components/Input/Input";

export const DeliveryAdress = ({}) => {
	const [city, setCity] = useState("");
	const [street, setStreet] = useState("");
	const [house, setHouse] = useState("");
	const [lit, setLit] = useState("-");
	const [appartment, setAppartment] = useState("0");

	const [cityError, setCityError] = useState({});
	const [streetError, setStreetError] = useState({});
	const [houseError, setHouseError] = useState({});
	const [litError, setLitError] = useState({});
	const [appartmentError, setAppartmentError] = useState({});
	const dispatch = useDispatch();
	useEffect(() => {
		let errorsObj = {
			city: true,
			street: true,
			house: true,
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
		<div className={styles.deliveryAdress}>
			<div className={styles.deliveryAdress__city}>
				<Input
					containerClassName={styles.containerInp}
					type="text"
					name="city"
					labelTitle="Ваше Місто"
					placeholder="Місто"
					onChange={(e) => {
						setCity(e.target.value);
					}}
					value={city}
					onBlur={(e) => setCityError(blurHandler(e))}
					onInput={(e) => setCityError(blurHandler(e))}
				>
					{Object.keys(cityError)[0] && (
						<Tooltip error={Object.keys(cityError)[0]} className={"right"} />
					)}
				</Input>
				<Input
					containerClassName={styles.containerInp}
					type="text"
					name="street"
					labelTitle="Вулиця" 
					placeholder="Вулиця"
					onChange={(e) => {
						setStreet(e.target.value);
					}}
					value={street}
					onBlur={(e) => setStreetError(blurHandler(e))}
					onInput={(e) => setStreetError(blurHandler(e))}
				>
					{Object.keys(streetError)[0] && (
						<Tooltip error={Object.keys(streetError)[0]} className={"right"} />
					)}
				</Input>
			</div>
			<div className={styles.address}>
				<Input
					className={styles.addressInput}
					type="number"
					name="house"
					id="house"
					// placeholder=""
					labelTitle="Дім"
					onChange={(e) => {
						setHouse(e.target.value);
					}}
					value={house}
					onBlur={(e) => setHouseError(blurHandler(e, false, 1, 4))}
					onInput={(e) => setHouseError(blurHandler(e, false, 1, 4))}
				>
					{Object.keys(houseError)[0] && (
						<Tooltip error={Object.keys(houseError)[0]} className={"bottom"} />
					)}
				</Input>
				<Input
					// className ={styles.deliveryAdress__lit}
					className={styles.addressInput}
					type="text"
					name="litHouse"
					id="litHouse"
					labelTitle="Літера"
					placeholder=""
					onChange={(e) => {
						setLit(e.target.value);
					}}
					onClick={(e) => {
						if (e.target.value == "-") {
							setLit("");
						}
					}}
					value={lit}
					onBlur={(e) => setLitError(blurHandler(e, true, 1, 1))}
					onInput={(e) => setLitError(blurHandler(e, true, 1, 1))}
				/>

				<Input
					className={styles.addressInput + " " + styles.appartment}
					type="number"
					name="appartment"
					id="appartment"
					labelTitle="Квартира"
					placeholder=""
					style={{ color: "transparent" }}
					onChange={(e) => {
						setAppartment(e.target.value);
					}}
					value={appartment}
					onBlur={(e) => {
						setAppartmentError(blurHandler(e, false, 0, 4, true));
						if (e.target.value != "0") {
							e.target.style.color = "inherit";
						}
						if (e.target.value.length == 0) {
							e.target.style.color = "transparent";
							setAppartment("0");
						}
					}}
					onInput={(e) => setAppartmentError(blurHandler(e, false, 0, 4, true))}
					onClick={({ target }) => {
						if (target.value == "0") {
							target.style.color = "inherit";
							setAppartment("");
						}
					}}
				>
					{Object.keys(appartmentError)[0] && (
						<Tooltip
							error={Object.keys(appartmentError)[0]}
							className={"bottom"}
						/>
					)}
				</Input>
			</div>
		</div>
	);
};
