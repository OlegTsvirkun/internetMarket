import React from 'react';
import { Link } from "react-router-dom";
// import { paths } from "../../paths";
import styles from './GoodsItem.module.scss';


export const GoodsItem = ({
  name = '',
  price = 0,
  goodImage = '',
  _id = '',

  category=''
}) => {
  return (
    <Link to={`${category}/${_id}`} className={styles.planeItem}>
      <div className={ styles.capacity}>{  }</div>
      { goodImage && <img className={styles.image} src={goodImage} alt=""/> }
      <div className={styles.info}>
        <h2 className={styles.title}>{ name }</h2>
        <span className={styles.price}>{ price } грн.</span>
      </div>
    </Link>
  );
};