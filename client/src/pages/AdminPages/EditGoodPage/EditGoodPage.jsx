import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../../components/UA_Components/Button';
import { ContentWrapper } from '../../../components/UA_Components/ContentWrapper';
import { UpdateGoodItem } from '../../../components/UpdateGoodItem/UpdateGoodItem';

import { getGood } from '../../../store/goodSlice';

import styles from './EditGoodPage.module.scss';

export const EditGoodPage = ({}) =>{

	const navigate = useNavigate()

 const [searchParams] =  useSearchParams()
  const dispatch = useDispatch()
  const {good,images,isLoading} =useSelector(state=>state.good)
  useEffect(() => {
    if(searchParams.get('id')) dispatch(getGood(searchParams.get('id')))
  // dispatch(getGood)
  }, []);
  if(isLoading) return <>Loading....</>
  return (
   <>
    <ContentWrapper className={styles.editGood}>
      <Button className = {styles.goodItem__backButton} onClick={() => navigate(-1)} isBackButton={true}>
  					Назад
  				</Button>
      
      <UpdateGoodItem
      id = {good._id}
      _category = {good.category?.category}
      _name ={good.name}
      _articul ={good.articul}
      _price ={good.price}
      _picture ={good.picture}
      _images  ={images}
      _description = {good.description}
      />
    </ContentWrapper>
   </>
)};

