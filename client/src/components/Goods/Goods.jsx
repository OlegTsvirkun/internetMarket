

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
import styles from './Goods.module.scss';

export const Goods = ({goods}) => {
  // const navigate = useNavigate()
 

  return (
    <>
      <ContentWrapper className={styles.goodsGrid}>
        {Object.keys(goods).map(item=>{
     return  <GoodCard 
     key = {goods[item]['_id']} 
     {...goods[item]}/>
        })} 
      </ContentWrapper>
    </>
  );
};
