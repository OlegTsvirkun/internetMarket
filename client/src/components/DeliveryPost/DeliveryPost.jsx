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
			obj = { ["Поле не може бути порожнім"]: true };
		} else if (e.target.value.length < minValue) {
			obj = { [`Поле має бути більше ${minValue} символів`]: true };
		} else if (e.target.value.length > maxValue) {
			obj = { [`Поле має бути не більше ${maxValue} символів`]: true };
		} else if (Validator(e)) {
			obj = { [Validator(e)]: true };
		} else {
			obj = {};
		}
    if (Object.keys(obj)[0]) {
			dispatch(addError({ [e.target.name]: true }));
		} else {
			dispatch(remooveError({ [e.target.name]: false }));
		}
return obj
	}
  return (
    <div className={styles.deliveryPost}>
   <label htmlFor=''>
   Місто:
      <input
        type="text"
        name="city"
      data-caption = "Місто"
        placeholder="Місто"
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
     
    <label className={styles.deliveryPost__postN}  htmlFor="postNP">Відділення НП
    <input
      id="postNP"
      type="number"
      name="postNP"
      data-caption = "Відділення НП"
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

