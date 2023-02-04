import React from 'react';
import styles from './ScheduleList.module.scss';

export const ScheduleList = ({scheduling, containerClassName='', className=''}) =>{
  if(!Object.keys(scheduling)[0]) <></>

  return (
  <ul className={ `${styles.scheduleList} ${containerClassName}`} >
    <span>Час роботи Call-центру:</span>
						
						{	Object.keys(scheduling).map((days) => (
								<li key={days} className={`${styles.days} ${className}`} >
									<span>{days}:</span> <h4>{scheduling[days]}</h4>
								</li>
							))}
  </ul>
)};

