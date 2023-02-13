import React from "react";
import {
	deliveryKeys,
	officeKeys,
	statusColor,
	statusTranslate,
} from "../../../../utils/constUserOrder";
import { priceFormating } from "../../../../utils/priceFormating";
import { ScheduleList } from "../../../AdditionalComponents/ScheduleList/ScheduleList";
import { TelList } from "../../../AdditionalComponents/TelList/TelList";
import { GoodListUserOrder } from "../GoodListUserOrder";
import styles from "./UserOrderItem.module.scss";

export const UserOrderItem = ({ order, index,containerClassName }) => {
	// console.log(order)
	if(!Object.keys(order)[0]) return <>No data</>
	return (
		<details className={`${styles.userOrderItem } `} open={index == 0 ? true : false}>
			<summary   >
				<span className={styles.summary} >
					Заказ № <span className={styles.title}>{order.orderId}</span> від:{" "}
					<span className={styles.title}>
						{order?.createdAt.split("T").slice(0, 1)}
					</span>{" "}
					СТАТУС:{" "}
					<span
						style={{
							backgroundColor: `${statusColor[order.status]}`,
						}}
						className={styles.statusItem}
					>
						{statusTranslate[order.status]}
					</span>{" "}
				</span>
			</summary>
			<div className={`${styles.userOrdersTable } ${containerClassName}`}>
				<header className={styles.header}>
					<div className={styles.headerEl}>Заказ номер: {order.orderId}</div>
					<div className={styles.headerEl}>
						Дата заказу:{" "}
						{order.createdAt.split("T").slice(0, 1) +
							" " +
							order.createdAt.split(/[T\.]/).slice(1, 2)}
					</div>
				</header>
				<main className={styles.main}>
					
					<section className={styles.orderInfo}>
						
						<div className={styles.statusUpdated}>
							Статус оновлено:{" "}
							{order.updatedAt.split("T").slice(0, 1) +
								" " +
								order.updatedAt.split(/[T\.]/).slice(1, 2)}
						</div>
					</section>
					<section className={styles.userInfo}>
						<div className={styles.title}>Замовник:</div>
						<div>{`${order.userContacts?.name || ''} ${order.userContacts?.firstname || ''}` }</div>
						<div className={styles.userContacts}>
							<a href={`tel:${order.userContacts?.tel || 
							''}`} className={styles.tel}>Телефон: {`${order.userContacts?.tel || 
							''}`}</a>
							<a href={`email:${order.userContacts?.tel || 
							''}`} className={styles.email}>email: {`${order.userContacts?.email || 
							''}`}</a>
						</div>
					</section>
					<div className={styles.listTitile}>Список товарів:</div>
					{order?.goods && <GoodListUserOrder goods={order.goods} />}
				</main>

				<div className={styles.totalPrice}>
					Загальна сума до сплати: {priceFormating(order.totalPrice)} грн.
				</div>
				<footer className={styles.footer}>
					<section className={styles.delivery}>
						{Object.keys(order?.delivery)[0] && Object.keys(order.delivery).map((key) => {
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
						{typeof order.delivery?.office =='object' ?
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
												{officeKeys[key]}: {[order.delivery.office][key]}
											</p>
										);
								}
							})
						:<></>
						}
						<div className={styles.deliveryFooter}>
							{order.delivery.office?.scheduling && (
								<ScheduleList
									containerClassName={styles.deliveryFooterEl}
									titleClassName={styles.title}
									schedule={order.delivery.office.scheduling}
								/>
							)}

							{order.delivery.office?.tel && (
								<TelList
									containerClassName={styles.deliveryFooterEl}
									titleClassName={styles.title}
									tel={order.delivery.office.tel}
								/>
							)}
						</div>
					</section>
				</footer>
			</div>
		</details>
	);
};
