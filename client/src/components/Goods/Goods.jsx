

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
import styles from './Goods.module.scss';

export const Goods = () => {
  const dispatch = useDispatch()
  useEffect(() => {
   dispatch(getMain())
  }, [dispatch]);
  const { categories, goods, isLoading } = useSelector((state) => state.main);
  
  console.log(categories);
  // const { isDescSort, setIsDescSort, sortedGoods } = useSortGoods(
  //   Goods || []
  // );

  // useEffect(() => {
  //   dispatch(getGoods());
  // }, [dispatch]);

  if (isLoading) return <div>Loaadiing...</div>;

  return (
    <div>
     
      <ContentWrapper className={styles.goodsGrid}>
        {/* { categories.map(item=><CategoryCard cat ={item.category} catId = {item._id}  />)} */}

        {/* {sortedGoods &&
          sortedGoods.map((plane) => <GoodsItem key={plane._id} {...plane} />)} */}
      </ContentWrapper>
    </div>
  );
};
