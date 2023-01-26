import React, { useState } from "react";
import styles from "./MenuCatalog.module.scss";
import { MenuGoods } from "../MenuGoods/MenuGoods";
import { Link} from "react-router-dom";

export const MenuCatalog = ({ categories, goods, className,setisCatMenuOpen }) => {

	const [catId, setCatId] = useState("");
	let good = [];
	if (goods[0]) good = goods.filter((item) => item.category["_id"] == catId);
	return (
		<div className={`${styles.menuCatalog} ${className}`}>
			<ul
				className={styles.list}
				onClick={(e) => e.stopPropagation()}
			>
				{categories &&
					Object.keys(categories).map((id) => (
						<Link
							key={id}
							className={styles.cat}
							onMouseEnter={() => setCatId(id)}
							to={`cat/${categories[id]}`}
							onClick={
							()=>	setisCatMenuOpen(false)
							}
						>
							<li className={styles.item}>{categories[id]}</li>{" "}
							<span> &gt; </span>{" "}
						</Link>
					))}
			</ul>
			{
				<MenuGoods
					key={catId}
					goods={good}
					catId={catId}
				/>
			}
		</div>
	);
};
