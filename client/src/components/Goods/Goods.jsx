

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCategory } from "../../store/categorySlice";
import { getMain } from "../../store/mainSlice";
// import { useSortGoods } from "../../hooks/useSortGoods";
// import { paths } from "../../paths";
// import { getGoods } from "../../store/Goods/GoodsSlice";
import { Button } from "../Button";
import { CategoryCard } from "../CategoryCard/CategoryCard";
import { ContentWrapper } from "../ContentWrapper";
import { GoodCard } from "../GoodCard";
// import { PlaneItem } from "../plane-item";
// import { Spinner } from "../spinner";
import styles from './Goods.module.scss';

export const Goods = ({category}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategory(category))
  }, [dispatch]);
  const {goods, isLoading } = useSelector((state) => state.category);
  


  if (isLoading) return <div>Loaadiing...</div>;

  return (
    <div>
     
     <ContentWrapper className = {styles.backButton}>
        <Button  onClick={() => navigate(-1)} isBackButton={true}>
  					Назад
  				</Button>
     </ContentWrapper>
      <ContentWrapper className={styles.goodsGrid}>
        {Object.keys(goods).map(item=>{
     return  <GoodCard 
     key = {goods[item]['_id']} 
     {...goods[item]}/>

        })} 
      </ContentWrapper>
    </div>
  );
};
