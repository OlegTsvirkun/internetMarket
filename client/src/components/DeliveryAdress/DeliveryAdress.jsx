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
	const blurHandler = (e, maxValue = 40, minValue = 3) => {
		let obj = {};
		if (e.target.value.length < 1) {
			obj = { ["Поле не может быть пустым"]: true };
		} else if (e.target.value.length < minValue) {
			obj = { [`Поле должно быть больше ${minValue} символов`]: true };
		} else if (e.target.value.length > maxValue) {
			obj = { [`Поле должно быть не больше ${maxValue} символов`]: true };
		} else if (Validator(e)) {
			obj = { [Validator(e)]: true };
		} else {
			obj = {};
		}
		if (Object.keys(obj)[0]) {
			dispatch(addError({ [e.target.name]: true }));
		} else {
			dispatch(remooveError({ [e.target.name]: false }));
			// let catObj = {};
			// catObj[e.target.dataset.set] = { [e.target.name]: e.target.value };
			// dispatch(addCatDelivery({ ...catObj }));
		}
		return obj;
	};

	return (
		<div className={styles.deliveryAdress}>
			<div className={styles.deliveryAdress__city}>
				<label htmlFor="">
					Город
					<input
						type="text"
						name="city"
						placeholder="Город"
						data-caption = "Город"
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
					Улица
					<input
						type="text"
						name="street"
						placeholder="Улица"
						data-caption = "Улица"

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
					Дом
					<input
						// className ={styles.deliveryAdress__house}
						type="number"
						name="house"
						id="house"
						// placeholder=""
						data-caption = "Дом"

						onChange={(e) => {
							setHouse(e.target.value);
						}}
						value={house}
						onBlur={(e) => setHouseError(blurHandler(e, 4, 1))}
						onInput={(e) => setHouseError(blurHandler(e, 4, 1))}
					/>
					{Object.keys(houseError)[0] && (
						<Tooltip error={Object.keys(houseError)[0]} className={"bottom"} />
					)}
				</label>

				<label htmlFor="lit">
					Литера
					<input
						// className ={styles.deliveryAdress__lit}
						type="text"
						name="lit"
						id="lit"
						data-caption = "Литера"

						placeholder=""
						onChange={(e) => {
							setLit(e.target.value);
						}}
						value={lit}
						onBlur={(e) => setLitError(blurHandler(e))}
						onInput={(e) => setLitError(blurHandler(e))}
					/>
					{/* { (Object.keys(litError)[0] &&
						<Tooltip error = {Object.keys(litError)[0]}  className= {'bottom'}/>
					)} */}
				</label>

				<label htmlFor="appartment">
					Квартира
					<input
						// className ={styles.deliveryAdress__appartment}
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
						onBlur={(e) => setAppartmentError(blurHandler(e))}
						onInput={(e) => setAppartmentError(blurHandler(e))}
						onClick={({target})=>{
							if(target.value =='0'){
							target.style.color='inherit'
							// console.log(e.target);
							target.value=''
						}
						}}
					/>
					{/* { (Object.keys(appartmentError)[0] &&
						// <Tooltip error = {Object.keys(appartmentError)[0]}  className= {'bottom'}/>
					)} */}
				</label>
			</div>
		</div>
	);
};
