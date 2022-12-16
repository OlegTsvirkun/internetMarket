import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMain } from "../../store/mainSlice";
// import { useSortGoods } from "../../hooks/useSortGoods";
// import { paths } from "../../paths";
// import { getGoods } from "../../store/Goods/GoodsSlice";
import { Button } from "../Button";
import { CategoryCard } from "../CategoryCard/CategoryCard";
import { ContentWrapper } from "../ContentWrapper";
// import { PlaneItem } from "../plane-item";
// import { Spinner } from "../spinner";
import styles from "./Categories.module.scss";

export const Categories = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getMain());
	}, [dispatch]);
	const { categories, goods, images, isLoading } = useSelector(
		(state) => state.main,
	);

	if (isLoading) return <div>Loaadiing...</div>;

	return (
		<div>
			<ContentWrapper className={styles.goodsGrid}>
				{categories && Object.keys(categories).map((id) => {
					let goo = goods.filter((item) => {
						return item.category["_id"] == id;
					});
					return (
						<CategoryCard
							key={id}
							goods={goo}
							cat={categories[id]}
							catId={id}
							image={images[id]}
						/>
					);
				})}

				{/* {sortedGoods &&
          sortedGoods.map((plane) => <GoodsItem key={plane._id} {...plane} />)} */}
			</ContentWrapper>
		</div>
	);
};
