import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FailPage } from "../../../../pages/FailPage/Failpage";
import { clearOrderData, getUserOrder } from "../../../../store/userCabinetSlice";
import { priceFormating } from "../../../../utils/priceFormating";
import { Spinner } from "../../../UA_Components/Spinner/Spinner";
import { UserOrderItem } from "../../UserOrderItem/UserOrderItem";
import styles from "./UserOrders.module.scss";

export const UserOrders = ({}) => {
	const dispatch = useDispatch();
	const { email } = useSelector((state) => state.user);
	const { orderData, isLoading, isError } = useSelector(
		(state) => state.userCabinet,
	);

	useEffect(() => {
		if (email) dispatch(getUserOrder());
		return () => {
			dispatch(clearOrderData());
		};
	}, [email]);
	console.log(Object.values(orderData)[0]);
	if (isLoading) return <div className={styles.spinner}><Spinner/> </div>;
	return (
		<div className={styles.userOrders}>
			<h1 className={styles.mainTitle}>Сторінка заказів:</h1>
			{!Object.values(orderData)[0] ?
			<FailPage message="Ще не було жодного заказу:" backTo = {false} /> :
			Object.values(orderData).map((order,index) => {
				if (typeof order === "object")
					return (
              <UserOrderItem  key={order.orderId} order={order} index = {index}/>
           
					);
			})}
		</div>
	);
};
