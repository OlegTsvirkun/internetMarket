import React from "react";
import { GoodCard } from "../GoodCard";
import styles from "./Goods.module.scss";
import {  useSelector } from "react-redux";


export const Goods = ({ }) => {
	const { goods, isLoading } = useSelector((state) => state.category);
	if (isLoading) return <div>Loaadiing...</div>;
	return (
			<div className={styles.goodsGrid}>
				{Object.keys(goods).map((item) => {
					return <GoodCard key={goods[item]["_id"]} {...goods[item]} />;
				})}
			</div>
	);
};
