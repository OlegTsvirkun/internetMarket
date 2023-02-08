

import React, { useEffect, useState } from "react";
import { regEmail, regTel, regText } from "../../../utils/constValidPatterns";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import styles from './UserConfigs.module.scss';
import { Button } from "../../UA_Components/Button/Button";
import { Spinner } from "../../UA_Components/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { changeAuth, getUserInfo } from "../../../store/userSlice";
import userServices, { changeUserData } from "../../../store/services/userService";
import { LOGIN_ROUTE, MAIN_ROUTE } from "../../../utils/constRoutes";
import { sleep } from "../../../utils/sleep";
import { ModalAlert } from "../../AdditionalComponents/ModalAlert/ModalAlert";
export const UserConfigs = ({}) => {

	const {email,info} = useSelector(state => state.user)
// const {name, firstname, tel}=useSelector(state => state.userCabinet.userContacts)
// console.log(email);
const dispatch = useDispatch()
const [isChecked, setIsChecked] = useState(false);
const [isModal, setIsModal] = useState(false);
const [response, setResponse] = useState('111111 111');
	const {
		register,
		setError,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors, isValid },
	} = useForm({ mode:"onSubmit" });
	const navigate = useNavigate()
useEffect(() => {
	dispatch(getUserInfo())
	
	
}, [email]);
	useEffect(() => {
		setValue('email', email || '')
		setValue('firstname',  info?.firstname || '')
		setValue('name',  info?.name || '')
		setValue('tel' , info?.tel || '')
			
		return () => {
		};
	}, [info]);
	const logOut = () => {
		dispatch(changeAuth(false));
		navigate(LOGIN_ROUTE);
	};
const onSubmit = async()=>{
if(isValid) {

	await changeUserData(getValues())
	.then(data=> {
		setResponse('Оновлення данних') //! 1
		console.log(response)
		setIsModal(true)
		if(getValues('email') !== email && getValues('email') !== undefined){
			sleep(2000)
			.then(()=>setResponse(data?.response) ) //! 2
			.then(()=>sleep(2000).then(()=>{
				setIsModal(false)
			logOut()
		}) )//! 3
		

			
		}else{
			sleep(1500).then(()=>{
				setResponse(data?.response) //! 2
			}).then(()=>{
				sleep(1000).then(()=>{ 
					navigate(MAIN_ROUTE)}) //! 3
			}) 
		
			

		}
		
		
		 }).catch(err=>{
			console.log(err.response.data.message)
setError('email',{message: err.response.data.message})
		 })

};
}
	return (
		<div className={styles.userConfigs}>
			<form  onSubmit={handleSubmit(onSubmit)}>
				<h3 className={styles.title}>Заповніть Ваші контактні дані</h3>{" "}
				<div className={styles.contacts}>
					<label> 
						Прізвище
						<input
							style={{
								border: `${errors?.firstname ? "solid 1px red" : ""}`,
							}}
							{...register("firstname", {
								required: "Треба заповнити поле",
								pattern: {
									value: regText,
									message: "Поле має містити лише літери",
								},
								minLength: {
									value: 3,
									message: "Назва повинна бути не менше 3 символів",
								},
								maxLength: {
									value: 50,
									message: "Назва повинна бути не більше 50 символів",
								},
							})}
							placeholder="Прізвище"
						/>
					</label>
					<p className={styles.error}>
						{errors?.firstname ? errors?.firstname?.message || "Error" : ""}
					</p>
					<label>
						Ім'я
						<input
							style={{
								border: `${errors?.name ? "solid 1px red" : ""}`,
							}}
							placeholder="Ім'я"
							{...register("name", {
								pattern: {
									value: regText,
									message: "Поле має містити лише літери",
								},
								required: "Треба заповнити поле",
								minLength: {
									value: 3,
									message: "Назва повинна бути не менше 3 символів",
								},
								maxLength: {
									value: 50,
									message: "Назва повинна бути не більше 50 символів",
								},
							})}
						/>
					</label>
					<p className={styles.error}>
						{errors?.name ? errors?.name?.message || "Error" : ""}
					</p>
					<label>
						Телефон
						<input
							style={{
								border: `${errors?.tel ? "solid 1px red" : ""}`,
							}}
							type="tel"
							placeholder="Телефон"
							{...register("tel", {
								pattern: {
									value: regTel,
									message: "Введіть телефон у фоматі: +380123456789",
								},
								required: "Треба заповнити поле",
							})}
						/>
					</label>
					<p className={styles.error}>
						{errors?.tel ? errors?.tel?.message || "Error" : ""}
					</p>
					<label >
						<div><label className={styles.checkbox} ><input className={styles.checkboxItem} type='checkbox' checked = {isChecked} onChange={()=>setIsChecked(!isChecked)} />Змінити email: </label></div>
						<input
							style={{
								border: `${errors?.email ? "solid 1px red" : ""}`,
								color: `${!isChecked? 'var(--grey-transparent)' : 'var(--grey)'}`,
							}}
							type="email"
							placeholder="example@mail.com"
							{...register("email", {
								disabled:!isChecked,
								onChange:()=>{console.log(errors);},
								pattern: {
									value: regEmail,
									message: "Некоректний e-mail",
								},
								required: "Треба заповнити поле",
								minLength: {
									value: 5,
									message: "Назва повинна бути не менше 3 символів",
								},
								maxLength: {
									value: 50,
									message: "Назва повинна бути не більше 50 символів",
								},
							})}
						/>
					</label>
					<p className={styles.error}>
						{errors?.email ? errors?.email?.message || "Error" : ""}
					</p>
				</div>
        <Button isDisableButton={!isValid} type={onsubmit} > Відправити </Button>
			</form>
			{isModal &&<ModalAlert isFirst={false}  closeClick={()=>setIsModal(false)}><Spinner/> <p>{response}</p>
			 </ModalAlert> }
		</div>
	);
};
