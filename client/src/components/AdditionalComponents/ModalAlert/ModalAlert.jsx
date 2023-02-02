import React, { useEffect } from "react";
import { Button } from "../../UA_Components/Button/Button";
import { BsX } from "react-icons/bs";
import styles from "./ModalAlert.module.scss";

export const ModalAlert = ({
	isErrorWindow = false,
	title = "",
	message = "",
	children,
	className = "",
	frstBtnTitle,
	scndBtnTitle = "",
	isFirst = true,
	isSecond = false,
	onClick = () => null,
	frstBtnClick,
	scndBtnClick,
	closeClick,
	bcgClick,
	width = "auto",
}) => {
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "scroll";
		};
	}, []);

	return (
		<div className={styles.window}>
			<div
				onClick={bcgClick || closeClick}
				className={styles.modalBackground}
			></div>
			<div
				className={`${styles.itemWindow} ${className}`}
				style={{ width: `${width}` }}
			>
				<div className={styles.title}>
					<div></div>
					<h3 style={{color:`${isErrorWindow? "red":""}`}} >{title || message}</h3>
					<span onClick={closeClick}>
						<BsX size="25" />
					</span>
				</div>
				<div className={styles.contentContainer}>
					{children ? (
						<div className={styles.children}>{children}</div>
					) : (
						<h3 style={{color:`${isErrorWindow? "red":""}`}} className={styles.message}>{message}</h3>
					)}
					<div className={styles.btnContainer}>
						{isFirst && (
							<Button
								className={styles.btn}
								onClick={frstBtnClick || closeClick}
							>
								{frstBtnTitle ? frstBtnTitle : "Ок"}
							</Button>
						)}
						{isSecond && (
							<Button onClick={scndBtnClick} isAlertButton={isErrorWindow} className={styles.btn}>
								{scndBtnTitle}
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
