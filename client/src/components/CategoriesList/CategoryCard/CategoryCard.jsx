import React from "react";
import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.scss";
export const CategoryCard = ({ cat, id, image, goods }) => {
	return (
		<div className={styles.categoryCard}>
			<Link className={styles.item} to={`cat/${cat}`}>
				<div className={styles.name}>{cat}</div>
				
					<img
						className={styles.image}
						src={process.env.REACT_APP_API_URL + image}
						alt={cat}
					/>
				
			</Link>
			<ul className={styles.goodsList}>
				{Object.keys(goods).map((good) => {
					return (
						<Link
							key={goods[good]._id}
							to={`good?id=${goods[good]._id}`}
							className={styles.title}
						>
							<li>{goods[good].name}</li>
						</Link>
					);
				})}
			</ul>
			<div className={styles.gradient}></div>
		</div>
	);
};
