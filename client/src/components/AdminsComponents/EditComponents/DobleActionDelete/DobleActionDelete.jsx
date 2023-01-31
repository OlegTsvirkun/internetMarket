import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { FaLongArrowAltLeft } from "react-icons/fa";

import styles from "./DobleActionDelete.module.scss";

export const DobleActionDelete = ({ onClick = () => null }) => {
	const [isDeleteVisible, setIsDeleteVisible] = useState(false);

	return (
		<div className={styles.dobleActionDelete}>
			{!isDeleteVisible && (
				<span
					className={styles.delete}
					onClick={() => setIsDeleteVisible(true)}
				>
					{" "}
					<IoCloseOutline size="30" />
				</span>
			)}
			{isDeleteVisible && (
				<span
					className={styles.back}
					onClick={() => setIsDeleteVisible(false)}
				>
					<FaLongArrowAltLeft/>
					{/* <IoCloseOutline size="30" /> */}
				</span>
			)}
			{isDeleteVisible && (
				<>
					<span onClick={onClick}>
						<IoCloseOutline className={styles.deleteIcon} size="80" />
					</span>
					<div className={styles.deleteBackground}></div>
				</>
			)}
		</div>
	);
};
