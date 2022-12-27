import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCatDelivery, addError, addField, remooveError } from '../../store/orderSlice';
import { Validator } from '../../utils/validator';
import { Tooltip } from '../Tooltip/Tooltip';
// import { input } from '../input/input';
import styles from './DeliveryPost.module.scss';

export const DeliveryPost = ({}) =>{
	const [post, setPost] = useState("");
	const [cityDelivery, setCityDelivery] = useState("");
	const [postError, setPostError] = useState({});
	const [cityDeliveryError, setCityDeliveryError] = useState({});
const {itemsInOrder}= useSelector(state=>state.order)
  const dispatch = useDispatch()
  const blurHandler = (e, maxValue = 40, minValue = 3) => {
		let obj = {};
		if (e.target.value.length < 1) {
			obj = { ["Поле не может быть пустым"]: true };
		
		} else if (e.target.value.length < minValue) {
			obj = { [`Поле должно быть больше ${minValue} символов`]: true };
		} else if (e.target.value.length > maxValue) {
			obj = { [`Поле должно быть не больше ${maxValue} символов`]: true };
		} else if (Validator(e)) {
			obj = { [Validator(e)]: true };
		} else {
			obj = {};
		}
    if (Object.keys(obj)[0]) {
			dispatch(addError({ [e.target.name]: true }));
		} else {
			dispatch(remooveError({ [e.target.name]: false }));
      // let obj1 ={}
      // obj1[e.target.dataset.set]={[e.target.name]:e.target.value}
      // console.log(obj1);
      // let obj2 ={}
      // obj2[e.target.dataset.set]
      // obj2={...obj2[e.target.dataset.set],...{[e.target.name]:e.target.value}}
      // obj2[e.target.dataset.set][e.target.name]=e.target.value
      // {[e.target.dataset.set][e.target.name]= e.target.value }
			// dispatch(addCatDelivery({...obj1}))
		}
return obj
	}
  return (
    <div className={styles.deliveryPost}>
   <label htmlFor=''>
   Город:
      <input
        type="text"
        name="cityDelivery"
      data-caption = "Город"
        placeholder="Город"
        onChange={(e) => {
          setCityDelivery(e.target.value);
        }}
        value={cityDelivery}
        onBlur={(e) =>setCityDeliveryError( blurHandler(e))}
        onInput={(e) =>setCityDeliveryError( blurHandler(e))}	
      />
      { (Object.keys(cityDeliveryError)[0] &&
      <Tooltip error = {Object.keys(cityDeliveryError)[0]}  className= {'right'}/>
    )}
   </label>
     
    <label className={styles.deliveryPost__postN}  htmlFor="post">Отделение НП
    <input
      id="post"
      type="number"
      name="post"
      data-caption = "Отделение НП"
      placeholder="№"
      onChange={(e) => {
        setPost(e.target.value);
      }}
      value={post}
      onBlur={(e) =>setPostError( blurHandler(e))}
      onInput={(e) =>setPostError( blurHandler(e))}	
    />
    { (Object.keys(postError)[0] &&
    <Tooltip error = {Object.keys(postError)[0]}  className= {'right'}/>
  )}
      </label>
  </div>
)};

