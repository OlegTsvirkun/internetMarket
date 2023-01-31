import React from "react";
import { GoodCard } from "../GoodCard";
import styles from "./Goods.module.scss";
import {  useSelector } from "react-redux";
import { SkeletonGoodCard } from "../SkeletonGoodCard/SkeletonGoodCard";


export const Goods = ({ cardsLimit}) => {
	const { goods, isLoading } = useSelector((state) => state.category);
	// if (isLoading) return <div>Loaadiing...</div>;
	return (
			<div className={styles.goodsGrid}>
				{isLoading ? 
				 [...new Array(cardsLimit)].map((item, i) => {
							return (
								<div key={i} className="Skeleton">
									<SkeletonGoodCard />
								</div>
							);
					  })
				:Object.keys(goods).map((item) => {
					return <GoodCard key={goods[item]["_id"]} {...goods[item]} />;
				})}
			</div>
	);
};
