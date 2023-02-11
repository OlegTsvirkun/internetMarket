import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getOrder, setNewStatus } from "../../../store/managerCabinetSlice";
import { statusColor, statusTranslate } from "../../../utils/constUserOrder";
import { Button } from "../../UA_Components/Button/Button";
import { UserOrderItem } from "../../UserComponents/UserOrder/UserOrderItem/UserOrderItem"
import styles from "./ManagerOrderItem.module.scss";

export const ManagerOrderItem = ({}) => {
	const [selectValue, setSelectValue] = useState();
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const searchId = searchParams.get("id");
  const { statuses, itemOrder } = useSelector((state) => state.managerCabinet);
	console.log(searchId);
	useEffect(() => {
		if (searchId) dispatch(getOrder(searchId));
		return () => {};
	}, [searchId]);
  
	
	const setStatus = () => {
		dispatch(setNewStatus({ orderId: itemOrder._id, status: selectValue }));
	};
	console.log(itemOrder);
	if (!itemOrder?._id) return <>No data...</>;
	return (
		<div className={styles.managerOrderItem}>
			<UserOrderItem
				containerClassName={styles.containerOrderItem}
				order={itemOrder}
				index={0}
			/>
			<div className={styles.statusSide}>
				Оновити Статус:
				<select
					className={styles.selectStatus}
					value={selectValue || itemOrder.status}
					onChange={(e) => setSelectValue(e.target.value)}
				>
					{statuses &&
						statuses.map((status, index) => (
							<option
								style={{ backgroundColor: `${statusColor[status]}` }}
								key={index}
								value={status}
							>
								{" "}
								{statusTranslate[status]}{" "}
							</option>
						))}
				</select>
				<Button onClick={setStatus}>Змінити статус</Button>
			</div>
		</div>
	);
};
