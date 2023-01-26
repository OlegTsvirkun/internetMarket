import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../../store/userSlice";
import {
	LOGIN_ROUTE,
	MAIN_ROUTE,
	REGISTRATION_ROUTE,
} from "../../../utils/constRoutes";
import { ModalAlert } from "../../ModalAlert/ModalAlert";
import { Button } from "../../UA_Components/Button";
import { Input } from "../../UA_Components/Input/Input";
import styles from "./AuthComponent.module.scss";

export const AuthComponent = ({}) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [email, setEmail] = useState("user@user.ua");
	const [password, setPassword] = useState("1234");
	const [response, setResponse] = useState("");
	const [isAlert, setIsAlert] = useState(false);
	const isLogin = location.pathname === LOGIN_ROUTE;
	const { isLoading, isAuth, isError, message } = useSelector(
		(state) => state.user,
	);
	const handleClick = async (e) => {
		e.preventDefault();
		try {
			if (isLogin) {
				dispatch(loginUser({ email, password })).then((res) => {
					console.log(email);

					if (!res.error) {
						navigate(MAIN_ROUTE);
					} else if (res.error) {
						setIsAlert(true);
					}
				});
			} else {
				dispatch(registerUser({ email, password })).then((res) => {
					console.log(email);
					if (!res.error) {
						navigate(MAIN_ROUTE);
					} else if (res.error) {
						// console.log("isError", res.error);

						setIsAlert(true);
					}
				});
			}
		} catch (err) {
			console.log(err.response);
		}
	};
	return (
		<div className={styles.authComponent}>
			<h1 className={styles.caption}>
				{isLogin ? "Авторизація" : "Реєстрація"}
			</h1>
			<form className={styles.formContainer} action="">
				<label>
					{" "}
					<Input
						autoComplete={email.toString()}
						value={email}
						type="email"
						placeholder="Введіть вашу пошту..."
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					<Input
						autoComplete={password.toString()}
						value={password}
						type="password"
						placeholder="Введіть ваш пароль..."
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
			</form>
			<div className={styles.buttonContainer}>
				{isLogin ? (
					<>
						<h3>
							{" "}
							Ще не зареєєстрован?{" "}
							<Link to={REGISTRATION_ROUTE}>Зареєструватися</Link>
						</h3>

						<Button onClick={(e) => handleClick(e)}>Увійти</Button>
					</>
				) : (
					<>
						<h3>
							Вже зареєєстрован? <Link to={LOGIN_ROUTE}>Увійти</Link>
						</h3>
						<Button onClick={(e) => handleClick(e)}>Зареєструватися</Button>
					</>
				)}
			</div>
			{isAlert && (
				<ModalAlert
					title={`Помилка ${isLogin ? "авторизаціі" : "регістраціі"}`}
					message={message.message}
					// scndBtnTitle="close"
					frstBtnClick={() => setIsAlert(false)}
					// scndBtnClick
					closeClick={() => setIsAlert(false)}
					bcgClick={() => setIsAlert(false)}
				/>
			)}
		</div>
	);
};
