import React, { useEffect, useState } from "react";
import styles from "./MenuCatalog.module.scss";
import { BsLaptop } from "react-icons/bs";
import { host } from "../../host";
import { MenuGoods } from "../MenuGoods/MenuGoods";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { useDispatch } from "react-redux";
import { getMain } from "../../store/mainSlice";

export const MenuCatalog = ({ categories, goods, className }) => {


	const [catId, setCatId] = useState("");
	let good = [];
	if (goods[0]) good = goods.filter((item) => item.category["_id"] == catId);

	return (
		<div className={`${styles.menuCatalog} ${className}`}>
			<ul
				className={styles.menuCatalog__list}
				onClick={(e) => e.stopPropagation()}
			>
				{categories &&
					Object.keys(categories).map((id) => (
						<div
							key={id}
							className={styles.menuCatalog__cat}
							onMouseEnter={() => setCatId(id)}
						>
							<li className={styles.menuCatalog__item}>{categories[id]}</li>{" "}
							<span> &gt; </span>{" "}
						</div>
					))}
			</ul>
			{
				<MenuGoods
					key={catId}
					goods={good}
					catId={catId}
					// className={styles.menuGoods}
				/>
			}
		</div>
	);
};
