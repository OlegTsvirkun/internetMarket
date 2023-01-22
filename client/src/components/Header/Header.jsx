import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsCart, BsApple } from "react-icons/bs";
import styles from "./Header.module.scss";
import icon from "../../images/apple.svg";
import basket from "../../images/basket.svg";
import { CartBlock } from "../Cart/CartBlock/CartBlock";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/constRoutes";
import { changeAuth } from "../../store/userSlice";
import { ContentWrapper } from "../UA_Components/ContentWrapper";
import { Button } from "../UA_Components/Button";

export const Header = ({}) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	
		const location = useLocation();
	const isLogin = location.pathname === LOGIN_ROUTE;
	const { isAuth,role,isLoading } = useSelector((state) => state.user);
	// const {isLoading, isAuth,isError, message} =useSelector(state=> state.user)
const logOut =()=>{
	dispatch(changeAuth(false))
	navigate(MAIN_ROUTE)
}
	return (
		<div className={styles.header}>
			<ContentWrapper className={styles.header__headerContainer}>
				<Link to={MAIN_ROUTE} className={styles.header__item}>
					<div className={styles.header__logo}>
						<BsApple size="35" color="rgb(71, 71, 71)" />
					</div>
				</Link>
				<Link to="/" className={styles.header__item}>
					<span className={styles.header__title}> MyApple Store</span>
				</Link>
			<div></div>
				{<div className={styles.header__auth}>
					
					{isAuth ?(
						<div className={styles.buttonContainer}>
							{role.includes('ADMIN') && <Link to={ADMIN_ROUTE}>
								<Button className={styles.header__adminBtn}>Адмін Панель</Button>
							</Link>}
							<Link to="/">
	
								<Button className={styles.adminBtn} onClick= {logOut}>Вийти</Button>
							</Link>
						</div>
					):
					!isLogin ? <Link to={LOGIN_ROUTE}>
						<Button className={styles.adminBtn} onClick ={()=>navigate(LOGIN_ROUTE)} >Авторизація</Button>
					</Link>:
					<Link to={REGISTRATION_ROUTE}>
					<Button className={styles.adminBtn} onClick ={()=>navigate(LOGIN_ROUTE)} >Реєєстрація</Button>
				</Link>
					}
					
				</div>  }
			</ContentWrapper>
		</div>
	);
};
