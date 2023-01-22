import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SkeletonCat } from "../../SkeletonCat/SkeletonCat";
import { getMain } from "../../../store/mainSlice";
import { CategoryCard } from "../CategoryCard/CategoryCard";
import styles from "./Categories.module.scss";
import { ContentWrapper } from "../../UA_Components/ContentWrapper";

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
				{isLoading
					? [...new Array(6)].map((item, i) => {
							return (
								<div key={i} className="Skeleton">
									<SkeletonCat />
								</div>
							);
					  })
					: categories &&
					  Object.keys(categories).map((id) => {
							let good = goods.filter((item) => {
								return item.category["_id"] == id;
							});
							return (
								<CategoryCard
									key={id}
									goods={good}
									cat={categories[id]}
									catId={id}
									image={images[id]}
								/>
							);
					  })}
			</ContentWrapper>
		</div>
	);
};
