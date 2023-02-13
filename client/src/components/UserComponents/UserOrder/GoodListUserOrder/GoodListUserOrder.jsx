import React from "react";
import { Link } from "react-router-dom";
import { GOOD_ROUTE } from "../../../../utils/constRoutes";
import { priceFormating } from "../../../../utils/priceFormating";
import styles from "./GoodListUserOrder.module.scss";

export const GoodListUserOrder = ({
  goods,
	className = "",
	containerClassName = "",
	titleClassName = "",
	goodNameTitleClassName = "",
}) => {
  if(!Array.isArray(goods)){ 
    console.log('Bad type of value. It should be Array');

    return <></>};
  if(!goods.length){ 
    console.log('goods.length',!goods.length);
    
    return <>У Вас ще немає жодного замовлення</>};
	return (
		<div className={`${styles.goodListUserOrder}  ${containerClassName}`}>
			{goods?.map((good) => (
				<div key={good.name}>
					<Link to={GOOD_ROUTE + `?id=${good._id}`}>
						<p
							className={`${styles.goodName}  ${goodNameTitleClassName}`}
						>
							{good.name}
						</p>
					</Link>
					<div className={styles.goodInfoRow}>
						<section className={styles.goodInfo}>
							<p className={styles.price}>
								Ціна: {priceFormating(good.price)} грн.
							</p>

							<p className={styles.count}>Кількість: {good.count}</p>
						</section>
						<p className={styles.articul}>Артикул: {good.articul}</p>
					</div>
				</div>
			))}
		</div>
	);
};
