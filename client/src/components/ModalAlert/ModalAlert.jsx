import React, { useEffect } from "react";
import { Button } from "../Button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "./ModalAlert.module.scss";

export const ModalAlert = ({
	onClick = () => null,
	title = "",
	message_1 = "",
	message = "",
	children,
	className = "",
	scndBtnTitle = "",
	isSecond = false,
  frstBtnClick,
  scndBtnClick,
  closeClick,
  bcgClick
}) => {
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "scroll";
		};
	}, []);

	return (
		<div onClick={bcgClick} className={styles.modalBackground}>
			{children}
			<div className={`${styles.itemWindow} ${className}`}>
				<div className={styles.itemWindow__title}>
					<div></div> <h3>{title}</h3>
					<IoIosCloseCircleOutline size="22" onClick={closeClick}/>
				</div>
				{/* <div className={styles.itemWindow__container} > */}
				{/* <div className={styles.itemWindow__flexContainer}> */}
					{/* <h3 className={styles.itemWindow__message}>{message_1}</h3> */}
					<h3 className={styles.itemWindow__message}>{message}</h3>
					<div className={styles.itemWindow__btnContainer}>
						<Button className={styles.btnContainer__btn} onClick={frstBtnClick} >Ок</Button>
						{isSecond && (
							<Button onClick={scndBtnClick}  className={styles.btnContainer__btn}>
								{scndBtnTitle}
							</Button>
						)}
					{/* </div> */}
					{/* </div> */}
				</div>
			</div>
		</div>
	);
};
