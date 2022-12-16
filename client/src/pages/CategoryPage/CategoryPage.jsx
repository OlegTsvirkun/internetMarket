import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Goods } from '../../components/Goods';
import { SubHeader } from '../../components/SubHeader';
import { getCategory } from '../../store/categorySlice';
import styles from './CategoryPage.module.scss';

export const CategoryPage = ({}) =>{
  const {category} =  useParams()
 

  return (
  <div className={styles.categoryPage}>
    <SubHeader/>
   <Goods category= {category}/>
  </div>
)};