import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BsCart,BsApple} from 'react-icons/bs'
import styles from "./Header.module.scss";
import icon from "../../images/apple.svg";
import basket from "../../images/basket.svg";
import { Button } from "../Button/Button";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper";
import { CartBlock } from "../CartBlock/CartBlock";

export const Header = ({}) => {
	return (
		<div className={styles.header}>
	<ContentWrapper className={styles.header__headerContainer}>
	  		<Link to="/" className={styles.header__item}>
  				<div className={styles.header__logo}>
          <BsApple size = '35' color= 'rgb(71, 71, 71)'/>
  					{/* <img className={styles.header__logoIcon} src={icon} /> */}
  				</div>
  			
  			</Link>
  			<Link to="/" className={styles.header__item}>
        <span className={styles.header__title}> MyApple Store</span>
  			
  			</Link>
  			{/* <Link to="/" className={styles.header__menu}>
  				 <Button>MENU</Button>
  			</Link> */}
  			<div className={styles.header__basket}>
  				{/* {
  					location.pathname !== "/order" && (
              <CartBlock/>
  						
  					) */}
  					{/* // <svg className={styles.header__basket-icon} src = {basket}/> */}
  				{/* } */}
  			</div>
	</ContentWrapper>
		</div>
	);
};
