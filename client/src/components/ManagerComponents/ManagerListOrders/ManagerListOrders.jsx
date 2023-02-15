import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { getOrders } from "../../../store/slices/managerCabinetSlice";
import { MANAGER_ORDER_ROUTE} from "../../../utils/constRoutes";
import { statusColor, statusTranslate } from "../../../utils/constUserOrder";
import styles from "./ManagerListOrders.module.scss";

export const ManagerListOrders = ({ orderList }) => {
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	console.log(searchParams.get("status"));
	const searchOrders = searchParams.get("status");
	useEffect(() => {
		if (searchOrders) dispatch(getOrders(searchOrders));
		return () => {};
	}, [searchOrders]);
	return (
		<div className={styles.managerListOrders}>
			<ul>
				{orderList.map((item) => (
					<Link key={item._id} className={styles.orderItem} to={`${MANAGER_ORDER_ROUTE}?id=${item._id}`}>
						<li className={styles.status}>
							{" "}
							{`№: ${item.orderId}`}{" "}
							<span style={{ background: `${statusColor[item.status]}` }}>
								{statusTranslate[item.status]}
							</span>{" "}
							Дата:{" "}
							{`${item.createdAt.split("T").slice(0, 1)} | Час: ${item.createdAt
								.split(/[T\.]/)
								.slice(1, 2)}`}
						</li>
					</Link>
				))}
			</ul>
		</div>
	);
};
