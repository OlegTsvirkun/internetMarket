import React from "react";
import { useSelector } from "react-redux";
import { ContentWrapper } from "../../../components/UA_Components/ContentWrapper/ContentWrapper";
import { Button } from "../../../components/UA_Components/Button/Button";
import { Link } from "react-router-dom";
import manager from '../../../img/maneger-service.png'
import styles from "./FinishOrder.module.scss";
export const FinishOrder = ({}) => {
	const { orderNumber, isLoading } = useSelector(
		(state) => state.order?.orderNumber,
	);
	isLoading && <div>Загрузка</div>;
	return (
		<ContentWrapper className={styles.finishOrder}>
			<h1 className={styles.title}>
				Дякуємо за покупку у нашому інтернет магазині MyApple Store.
			</h1>
			<div className={styles.block}>
				<img
					className={styles.img}
					src={manager}
					alt="maneger-service.png"
				/>
				<div className={styles.info}>
					<p className={styles.orderNumber}>
						Ваш номер заказу:<span>{orderNumber}</span>
					</p>
					<p>
						У найближчий час нашменеджер зв'яжеться з Вами для уточнення
						замовлення
					</p>
					<Button className={styles.button}>
						<Link to="/">Перейти до головної </Link>
					</Button>
				</div>
			</div>
		</ContentWrapper>
	);
};
