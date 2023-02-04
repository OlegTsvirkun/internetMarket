import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearOrderData, getUserOrder } from "../../../../store/userCabinetSlice";
import { priceFormating } from "../../../../utils/priceFormating";
import { UserOrderItem } from "../UserOrderItem/UserOrderItem";
import styles from "./UserOrders.module.scss";

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
              <UserOrderItem  key={order.orderId} order={order} index = {index}/>
           
					);
			})}
		</div>
	);
};
