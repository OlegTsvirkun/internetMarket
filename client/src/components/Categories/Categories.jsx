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
import SkeletonCat from "../SkeletonCat/SkeletonCat";
// import { PlaneItem } from "../plane-item";
// import { Spinner } from "../spinner";
import styles from "./Categories.module.scss";

export const Categories = () => {
	const dispatch = useDispatch();
	const { categories, goods, images, isLoading } = useSelector(
		(state) => state.main,
	);
	useEffect(() => {
		dispatch(getMain());
	}, [dispatch]);

	

	return (
		<div>
			<ContentWrapper className={styles.goodsGrid}>
				{isLoading? [... new Array(6)].map((item,i) => {return <div key ={i}  className="Skeleton"><SkeletonCat/></div>}):
				categories && Object.keys(categories).map((id) => {
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
