import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {  BsApple } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
	ADMIN_ROUTE,
	LOGIN_ROUTE,
	MAIN_ROUTE,
	MANAGER_ROUTE,
	REGISTRATION_ROUTE,
} from "../../../utils/constRoutes";
import { changeAuth } from "../../../store/userSlice";
import { ContentWrapper } from "../../UA_Components/ContentWrapper/ContentWrapper";
import styles from "./Header.module.scss";
import { UserMenu } from "../../UserComponents/UserMenu/UserMenu";
import { useState } from "react";

export const Header = ({}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [isUserMenu, setIsUserMenu] = useState(false);
	const location = useLocation();
	const isLogin = location.pathname === LOGIN_ROUTE;
	const { isAuth, role } = useSelector((state) => state.user);
	const logOut = () => {
		dispatch(changeAuth(false));
		setIsUserMenu(false);
		navigate(MAIN_ROUTE);
	};
	const AuthBtn = () => {
		return !isLogin ? (
			<Link to={LOGIN_ROUTE} className={styles.headerBtn}>
				Авторизація
			</Link>
		) : (
			<Link to={REGISTRATION_ROUTE} className={styles.headerBtn} >
					Реєєстрація
			</Link>
		);
	};
	const Menu = () => {
		return (
			<div
				onClick={() => setIsUserMenu(!isUserMenu)}
				className={`${styles.headerBtn} ${styles.userCabinet}`}
			>
				MENU
				{isUserMenu && (
					<UserMenu
						onClick={() => setIsUserMenu(false)}
						logOutClick={logOut}
						className={styles.userMenu}
					/>
				)}
			</div>
		);
	};
	const roleBtn = () =>{
		return(
			<div className={styles.buttonContainer}>
				{role.includes("ADMIN") && (
					<Link to={ADMIN_ROUTE}>
						<div className={styles.headerBtn}>Адмін Панель</div>
					</Link>
				)}
				{role.includes("MANAGER") && (
					<Link to={MANAGER_ROUTE}>
						<div className={styles.headerBtn}>Панель Менеджера</div>
					</Link>
				)}
				{role.includes("USER") && (
					Menu()
				)}
			</div>
		)
	}
	return (
		<div className={styles.header}>
			<ContentWrapper className={styles.headerContainer}>
				<Link to={MAIN_ROUTE} className={styles.item}>
					<div className={styles.logo}>
						<BsApple size="35" color="rgb(71, 71, 71)" />
					</div>
				</Link>
				<Link to="/" className={styles.item}>
					<span className={styles.title}> MyApple Store</span>
				</Link>
				<div>
					{isAuth && roleBtn()}
				</div>
				{
				isAuth
				?
					<div className={styles.headerBtn} onClick={logOut} >ВИЙТИ</div>
				:  AuthBtn() 
				}
			</ContentWrapper>
		</div>
	);
};
