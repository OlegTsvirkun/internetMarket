import React from "react";
import { Link } from "react-router-dom";
import styles from "./CategoryCard.module.scss";

export const CategoryCard = ({ cat, id, image, goods }) => {
	return (
		<div className={styles.categoryCard}>
			<Link className={styles.cardItem} to={`cat/${cat} `}>
				<div className={styles.categoryCard__name}>{cat}</div>
				{image && <img className={styles.categoryCard__image} src={image} alt={cat} />}
			</Link>
			<ul className={styles.categoryCard__goodsList}>
				{Object.keys(goods).map((good) => {
					return (
            <Link
            to={`${cat}/${goods[good].articul}`}
            
            className={styles.goodsList__title}
            >
						<li key={goods[good]._id}>
                {goods[good].name}
						</li>
  						</Link>
					);
				})}
			</ul>
		</div>
	);
};
