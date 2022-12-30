import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ContentWrapper } from '../../components/ContentWrapper';
import { Goods } from '../../components/Goods';
import { Button } from '../../components/Button';
import { getCategory } from '../../store/categorySlice';
import styles from './CategoryPage.module.scss';
 
export const CategoryPage = ({}) =>{
  const {category} =  useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => { 
    dispatch(getCategory(category))
  }, [dispatch]);

  const {goods, isLoading } = useSelector((state) => state.category);
  


  if (isLoading) return <div>Loaadiing...</div>;

  return (
  <div className={styles.categoryPage}>
    <ContentWrapper className = {styles.backButton}>
        <Button  onClick={() => navigate(-1)} isBackButton={true}>
  					Назад
  				</Button>
     </ContentWrapper>
    
   <Goods goods= {goods}/>
  </div>
)};