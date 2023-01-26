import React from "react";
import { useSelector } from "react-redux";
import styles from "./FinishOrder.module.scss";
import { ContentWrapper } from "../../../components/UA_Components/ContentWrapper/";
import { Button } from "../../../components/UA_Components/Button";
import { Link } from "react-router-dom";
export const FinishOrder = ({}) => {
	const { orderNumber, isLoading } = useSelector(
		(state) => state.order?.orderNumber,
	);
	isLoading && <div>Загрузка</div>;
	return (
		<ContentWrapper className={styles.finishOrder}>
			<h1 className={styles.finishOrder__title}>
				Дякуємо за покупку у нашому інтернет магазині MyApple Store.
			</h1>
			<div className={styles.finishOrder__block}>
				<img
					className={styles.finishOrder__img}
					src={process.env.REACT_APP_API_URL + "maneger-service.png"}
					alt="maneger-service.png"
				/>
				<div className={styles.finishOrder__info}>
					<p className={styles.finishOrder__orderNumber}>
						Ваш номер заказу:<span>{orderNumber}</span>
					</p>
					<p>
						У найближчий час нашменеджер зв'яжеться з Вами для уточнення
						замовлення
					</p>
					<Button className={styles.finishOrder__button}>
						<Link to="/">Перейти до головної </Link>
					</Button>
				</div>
			</div>
		</ContentWrapper>
	);
};
