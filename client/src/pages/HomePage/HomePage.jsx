import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Categories } from '../../components/Categories/Categories';
import { Goods } from '../../components/Goods';
import { SubHeader } from '../../components/SubHeader';
import { getMain } from '../../store/mainSlice';
import styles from './HomePage.module.scss';

export const HomePage = ({}) =>{
  // const [searchValue, setSearchValue] = useState('');

  return (
    <div className={styles.homePage}>
      {/* <SubHeader searchValue = {searchValue} setSearchValue={setSearchValue}/> */}
    <div className={styles.wraper}>
   <div className={styles.homePage__game_item}>
   
   <Categories/>
    </div>
  </div>
</div>
)};

