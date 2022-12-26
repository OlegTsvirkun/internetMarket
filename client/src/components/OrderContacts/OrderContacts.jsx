import React, { useEffect, useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button";
import { Link } from "react-router-dom";

import styles from "./OrderContacts.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addError } from "../../store/orderSlice";

export const OrderContacts = ({}) => {
	const [firstName, setFirstName] = useState("");
	const [name, setName] = useState("");
	const [tel, setTel] = useState("");
	const [email, setEmail] = useState("");
	const [isError, setIsError] = useState([]);
	const [errShow, setErrShow] = useState(false);

	const dispatch = useDispatch()
const errors = useSelector(state=>state.order.isErrors)

	// useEffect(() => {
	// 	dispatch(addError(isError))
	// }, [isError,dispatch]);
	
const validationContacts =(e)=>{
	e.preventDefault()
	setErrShow(true)
	console.log(isError);
// console.log(errors);
}
	return (
		<div className={styles.orderContacts}>
			<h3>Заполните Ваши контактные данные</h3>
			<div className={styles.orderContacts__contacts}>
			<label >Фамилия 
				<Input
					require={true}
					type="text"
					name="firstname"
					placeholder="Фамилия"
					onChange={(e) => {
						setFirstName(e.target.value);
					}}
					value={firstName}
					setIsError = {setIsError}
					errShow={errShow}
					setErrShow ={setErrShow}
					charNumberMin = {3}
					charNumberMax = {12}
				/>
				</label>
			<label >Имя 

				<Input
					require={true}
					type="text"
					name="name"
					placeholder="Имя"
					onChange={(e) => {
						setName(e.target.value);
					}}
					value={name}
					setIsError = {setIsError}
					errShow={errShow}
					setErrShow ={setErrShow}

					charNumberMin = {3}
					charNumberMax = {12}
				/>
				</label>

			<label >Телефон 

				<Input
					require={true}
					type="tel"
					name="tel"
					placeholder="Телефон"
					onChange={(e) => {
						setTel(e.target.value);
					}}
					value={tel}
					setIsError = {setIsError}
					errShow={errShow}
					setErrShow ={setErrShow}

					charNumberMin = {13}
					charNumberMax = {13}

				/>
				</label>

			<label >Ваш email 

				<Input
					require={true}
					type="email"
					name="email"
					placeholder="example@mail.com"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					value={email}
					setIsError = {setIsError}
					errShow={errShow}
					setErrShow ={setErrShow}

					charNumberMin = {5}
					charNumberMax = {40}

				/>
				</label>


			
			</div>
			<Button onClick={(e)=>validationContacts(e)}>Перейти далее</Button>
		</div>
	);
};
