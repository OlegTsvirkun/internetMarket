import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsCart, BsApple } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
	ADMIN_ROUTE,
	LOGIN_ROUTE,
	MAIN_ROUTE,
	REGISTRATION_ROUTE,
} from "../../../utils/constRoutes";
import { changeAuth } from "../../../store/userSlice";
import { ContentWrapper } from "../../UA_Components/ContentWrapper";
import { Button } from "../../UA_Components/Button";
import styles from "./Header.module.scss";

export const Header = ({}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const location = useLocation();
	const isLogin = location.pathname === LOGIN_ROUTE;
	const { isAuth, role, isLoading } = useSelector((state) => state.user);
	const logOut = () => {
		dispatch(changeAuth(false));
		navigate(MAIN_ROUTE);
	};
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
				<div>{isAuth &&
							<div className={styles.buttonContainer}>
								{role.includes("ADMIN") && (
									<Link to={ADMIN_ROUTE}>
										<Button className={styles.adminBtn}>
											Адмін Панель
										</Button>
									</Link>)}
								</div>
									}
									</div>
				{
					<div className={styles.auth}>
						{isAuth ? (
							<div className={styles.buttonContainer}>
								{/* {role.includes("ADMIN") && (
									<Link to={ADMIN_ROUTE}>
										<Button className={styles.adminBtn}>
											Адмін Панель
										</Button>
									</Link>
								)} */}
								<Link to="/">
									<Button className={styles.adminBtn} onClick={logOut}>
										Вийти
									</Button>
								</Link>
							</div>
						) : !isLogin ? (
							<Link to={LOGIN_ROUTE}>
								<Button
									className={styles.adminBtn}
									onClick={() => navigate(LOGIN_ROUTE)}
								>
									Авторизація
								</Button>
							</Link>
						) : (
							<Link to={REGISTRATION_ROUTE}>
								<Button
									className={styles.adminBtn}
									onClick={() => navigate(LOGIN_ROUTE)}
								>
									Реєєстрація
								</Button>
							</Link>
						)}
					</div>
				}
			</ContentWrapper>
		</div>
	);
};
