import React from 'react';
import styles from './ScheduleList.module.scss';

export const ScheduleList = ({schedule, containerClassName='', className='', titleClassName=''}) =>{
  if(!Object.keys(schedule)[0]) <></>

  return (
  <ul className={ `${styles.scheduleList} ${containerClassName}`} >
    <span className={titleClassName}>Час роботи Call-центру:</span>
						
						{	Object.keys(schedule).map((days) => (
								<li key={days} className={`${styles.days} ${className}`} >
									<span>{days}:</span> <h4>{schedule[days]}</h4>
								</li>
							))}
  </ul>
)};

