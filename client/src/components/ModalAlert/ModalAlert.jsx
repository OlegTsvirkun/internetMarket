import React, { useEffect } from "react";
import { Button } from "../UA_Components/Button";
import { BsX } from "react-icons/bs";
import styles from "./ModalAlert.module.scss";

export const ModalAlert = ({
	title = "",
	message = "",
	children,
	className = "",
	frstBtnTitle,
	scndBtnTitle = "",
	isFirst = true,
	isSecond = false,
	onClick = () => null,
	frstBtnClick = () => null,
	scndBtnClick = () => null,
	closeClick ,
	bcgClick = () => null,
}) => {
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "scroll";
		};
	}, []);

	return (
		<div onClick={bcgClick} className={styles.modalBackground}>
			
			<div className={`${styles.itemWindow} ${className}`}>
				<div className={styles.title}>
					<div></div> <h3>{title}</h3>
					<span onClick={closeClick}><BsX size="25"  /></span>
				</div>
				{children?<div className={styles.children} >{children}</div> : <h3 className={styles.message}>{message}</h3> }
				<div className={styles.btnContainer}>
					{isFirst && <Button className={styles.btnContainer__btn} onClick={frstBtnClick}>
						{frstBtnTitle? frstBtnTitle :  'Ок' }
					</Button>}
					{isSecond && (
						<Button onClick={scndBtnClick} className={styles.btnContainer__btn}>
							{scndBtnTitle}
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};
