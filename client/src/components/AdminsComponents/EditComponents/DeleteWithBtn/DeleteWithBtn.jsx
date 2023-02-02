import React from "react";
import { Button } from "../../../UA_Components/Button/Button";

import styles from "./DeleteWithBtn.module.scss";

export const DeleteWithBtn = ({
	onClickYes = () => null,
	onClickNo = () => null,
}) => {
	return (
		<div className={styles.deleteWithBtn}>
			<span className={styles.message} >Видалити товар ?</span>

			<div className={styles.btnContainer}>
				<Button isAlertButton={true} onClick={onClickYes}>
					Так
				</Button>
				<Button onClick={onClickNo}>Ні</Button>
			</div>
		</div>
	);
};
