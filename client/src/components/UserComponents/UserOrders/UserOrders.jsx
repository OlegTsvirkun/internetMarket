import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearOrderData, getUserOrder } from "../../../store/userCabinetSlice";
import { priceFormating } from "../../../utils/priceFormating";
import styles from "./UserOrders.module.scss";
const statusColor = {
	RIGISTERED: "red",
	"AWAITING PAYMENT": "orange",
	PAID: "green",
	CONFIRMED: "deepskyblue",
	CANCELLED: "deeppink",
	DELIVERING: "gold",
};
const deliveryKeys = {
	delivery: "Адресна доставка",
	city: "Місто",
	street: "Вулиця",
	house: "Дім",
	litHouse: "Літера",
	appartment: "Квартира",
	postNP: "Нова Пошта",
	// office:"Відділення",
};
const officeKeys = {
	address: "Адреса",
	tel: "Телефони",
	scheduling: "Розклад",
};
export const UserOrders = ({}) => {
	const dispatch = useDispatch();
	const { email } = useSelector((state) => state.user);
	const { userId } = useSelector((state) => state.userCabinet.orderData);
	const { orderData, isLoading, isError } = useSelector(
		(state) => state.userCabinet,
	);

	useEffect(() => {
		console.log(userId);
		if (email) dispatch(getUserOrder(email));
		if (email !== "userId") dispatch(clearOrderData());
		return () => {
			dispatch(clearOrderData());
		};
	}, [email]);
	if (isLoading) return <>Loading...</>;
	return (
		<div className={styles.userOrders}>
			{Object.values(orderData).map((order,index) => {
				if (typeof order === "object")
					return (
						<details key={order.orderId} open={index==0?true:false} >
              <summary>Заказ № <span className={styles.title}>{order.orderId}</span> від: <span className={styles.title} >{order.createdAt.split("T").slice(0, 1)}</span>  СТАТУС:	<span
  											style={{
  												backgroundColor: `${statusColor[order.status]}`,
  											}}
  											className={styles.statusItem}
  										>
  											{order.status}
  										</span> </summary>
						  <div  className={styles.userOrdersTable}>
  							<header className={styles.header}>
  								<div className={styles.headerEl}>
  									Заказ номер: {order.orderId}
  								</div>
  								<div className={styles.headerEl}>
  									Дата заказу:{" "}
  									{order.createdAt.split("T").slice(0, 1) +
  										" " +
  										order.createdAt.split(/[T\.]/).slice(1, 2)}
  								</div>
  							</header>
  							<main className={styles.main}>
  								<section className={styles.orderInfo}>
  									<div className={styles.status}>
  										Статус:
  										<span
  											style={{
  												backgroundColor: `${statusColor[order.status]}`,
  											}}
  											className={styles.statusItem}
  										>
  											{order.status}
  										</span>
  									</div>
  									<div className={styles.statusUpdated}>
  										Статус оновлено:{" "}
  										{order.updatedAt.split("T").slice(0, 1) +
  											" " +
  											order.updatedAt.split(/[T\.]/).slice(1, 2)}
  									</div>
  								</section>
  
  								<div className={styles.listTitile}>Список товарів:</div>
  
  								<section>
  									{order?.goods?.map((good) => (
  										<div key={good.name}>
  											<p className={styles.goodName}>{good.name}</p>
  											<div className={styles.goodInfoRow}>
  												<section className={styles.goodInfo}>
  													<p className={styles.price}>
  														Ціна: {priceFormating(good.price)} грн.
  													</p>
  
  													<p className={styles.count}>
  														Кількість: {good.count}
  													</p>
  												</section>
  												<p className={styles.articul}>
  													Артикул: {good.articul}
  												</p>
  											</div>
  										</div>
  									))}
  								</section>
  							</main>
  
  							<div className={styles.totalPrice}>
  								Загальна сума до сплати: {priceFormating(order.totalPrice)} грн.
  							</div>
  							<footer className={styles.footer}>
  								<section className={styles.delivery}>
  									{Object.keys(order.delivery).map((key) => {
  										// return <p>{order.delivery[key]}</p>
  										if (deliveryKeys[key]) {
  											if (
  												order.delivery[key] &&
  												order.delivery[key] != "-" &&
  												order.delivery[key] != 0
  											)
  												return (
  													<p className={styles.deliveryEl} key={key}>
  														{deliveryKeys[key]}: {order.delivery[key]}
  													</p>
  												);
  										}
  									})}
  									{Object.keys(order.delivery?.office)[0] &&
  										Object.keys(order.delivery.office).map((key) => {
  											if (officeKeys[key]) {
  												if (
  													order.delivery.office[key] &&
  													order.delivery[key] != "-" &&
  													order.delivery[key] != 0 &&
  													typeof order.delivery.office[key] === "string"
  												)
  													return (
  														<p className={styles.deliveryEl} key={key}>
  															{officeKeys[key]}: {order.delivery.office[key]}
  														</p>
  													);
  											}
  										})}
  									<div className={styles.deliveryFooter}>
  										{order.delivery.office?.scheduling && (
  											<div className={styles.deliveryFooterEl}>
  												<p className={styles.title}>Розклад: </p>
  												{Object.keys(order.delivery.office.scheduling).map(
  													(key, index) => (
  														<p key={index}>
  															{key}: {order.delivery.office.scheduling[key]}
  														</p>
  													),
  												)}
  											</div>
  										)}
  
  										{order.delivery.office?.tel && (
  											<div className={styles.deliveryFooterEl}>
  												<p className={styles.title}>Телефони:</p>
  												{order.delivery.office.tel.map((item) => (
  													<p key={item}>{item} </p>
  												))}
  											</div>
  										)}
  									</div>
  								</section>
  							</footer>
  						</div>
						</details>
					);
			})}
		</div>
	);
};
