import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getGood } from '../../../../store/goodSlice';
import { EditGoodItem } from '../EditGoodItem/EditGoodItem';
import styles from './EditGoodComponent.module.scss';

export const EditGoodComponent = ({}) =>{

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
      <EditGoodItem
      id = {good._id}
      _category = {good.category?.category}
      _name ={good.name}
      _articul ={good.articul}
      _price ={good.price}
      _picture ={good.picture}
      _images  ={images}
      _description = {good.description}
      />
   </>
)};

