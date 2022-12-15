import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CategoryPage.module.scss';

export const CategoryPage = ({}) =>{
 const {category} =  useParams()
 const navigate = useNavigate()

  return (
  <div className={styles.categoryPage}>
    CategoryPage Component
  </div>
)};