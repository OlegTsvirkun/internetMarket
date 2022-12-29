import React, { useState } from "react";
// import { input } from '../input/input';
import styles from "./DeliveryAdress.module.scss";
import { Validator } from "../../utils/validator";
import { Tooltip } from "../Tooltip/Tooltip";
import { useDispatch } from "react-redux";
import {
	addCatDelivery,
	addError,
	addField,
	remooveError,
} from "../../store/orderSlice";

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
	const blurHandler = (e,  minValue = 3,maxValue = 40,) => {
		let obj = {};
		if (e.target.value.length < 1) {
			obj = { ["Поле не може бути порожнім"]: true };
		} else if (e.target.value.length < minValue) {
			obj = { [`Поле має бути більше ${minValue} символів`]: true };
		} else if (e.target.value.length > maxValue) {
			obj = { [`Поле має бути не більше ${maxValue} символів`]: true };
		} else if (Validator(e)) {
			obj = { [Validator(e)]: true };
		} else {
			obj = {};
		}
		if (Object.keys(obj)[0]) {
			dispatch(addError({ [e.target.name]: true }));
		} else {
			dispatch(remooveError({ [e.target.name]: false }));
			
		}
		return obj;
	};

	return (
		<div className={styles.deliveryAdress}>
			<div className={styles.deliveryAdress__city}>
				<label htmlFor="">
				Місто
					<input
						type="text"
						name="city"
						placeholder="Місто"
						data-caption = "Місто"
						onChange={(e) => {
							setCity(e.target.value);
						}}
						value={city}
						onBlur={(e) => setCityError(blurHandler(e))}
						onInput={(e) => setCityError(blurHandler(e))}
					/>
					{Object.keys(cityError)[0] && (
						<Tooltip error={Object.keys(cityError)[0]} className={"right"} />
					)}
				</label>
				<label htmlFor="">
				Вулиця
					<input
						type="text"
						name="street"
						placeholder="Вулиця"
						data-caption = "Вулиця"

						onChange={(e) => {
							setStreet(e.target.value);
						}}
						value={street}
						onBlur={(e) => setStreetError(blurHandler(e))}
						onInput={(e) => setStreetError(blurHandler(e))}
					/>
					{Object.keys(streetError)[0] && (
						<Tooltip error={Object.keys(streetError)[0]} className={"right"} />
					)}
				</label>
			</div>
			<div className={styles.deliveryAdress__address}>
				<label htmlFor="house">
					Дім
					<input
						type="number"
						name="house"
						id="house"
						// placeholder=""
						data-caption = "Дім"

						onChange={(e) => {
							setHouse(e.target.value);
						}}
						value={house}
						onBlur={(e) => setHouseError(blurHandler(e, 1, 4))}
						onInput={(e) => setHouseError(blurHandler(e, 1, 4))}
					/>
					{Object.keys(houseError)[0] && (
						<Tooltip error={Object.keys(houseError)[0]} className={"bottom"} />
					)}
				</label>

				<label htmlFor="litHouse">
				Літера
					<input
						// className ={styles.deliveryAdress__lit}
						type="text"
						name="litHouse"
						id="litHouse"
						data-caption = "Літера"

						placeholder=""
						onChange={(e) => {
							setLit(e.target.value);
						}}
						value={lit}
						onBlur={(e) => setLitError(blurHandler(e,1,1))}
						onInput={(e) => setLitError(blurHandler(e,1,1))}
					/>
				
				</label>

				<label htmlFor="appartment">
					Квартира
					<input
						type="number"
						name="appartment"
						id="appartment"
						data-caption = "Квартира"

						placeholder=""
						style={{color:'transparent'}}
						onChange={(e) => {
							setAppartment(e.target.value);
						}}
						value={appartment}
						onBlur={(e) => setAppartmentError(blurHandler(e,1,4))}
						onInput={(e) => setAppartmentError(blurHandler(e,1,4))}
						onClick={({target})=>{
							if(target.value =='0'){
							target.style.color='inherit'
							target.value=''
						}
						}}
					/>
				
				</label>
			</div>
		</div>
	);
};
