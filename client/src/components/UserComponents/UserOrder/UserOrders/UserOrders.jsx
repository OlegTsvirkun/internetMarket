import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FailPage } from "../../../../pages/FailPage_/FailPage";
import { clearOrderData, getUserOrder } from "../../../../store/slices/userCabinetSlice";
import { Spinner } from "../../../UA_Components/Spinner/Spinner";
import { UserOrderItem } from "../UserOrderItem/";
import styles from "./UserOrders.module.scss";

export const UserOrders = ({}) => {
	const dispatch = useDispatch();
	const { email } = useSelector((state) => state.user);
	const { orderData, isLoading } = useSelector(
		(state) => state.userCabinet,
	);

	useEffect(() => {
		if (email) dispatch(getUserOrder());
		return () => {
			dispatch(clearOrderData());
		};
	}, [email]);
	if (isLoading) return <div className={styles.spinner}><Spinner/> </div>;
	return (
		<div className={styles.userOrders}>
			<h1 className={styles.mainTitle}>Сторінка заказів:</h1>
			{!orderData ?
			<FailPage message="Ще не було жодного заказу:" backTo = {false} /> :
			(Object.values(orderData).map((order,index) => {
				if (typeof order === "object")
					return (
              <UserOrderItem  key={order.orderId+''+index} order={order} index = {index}/>
           
					);
			}))
			}
		</div>
	);
};
