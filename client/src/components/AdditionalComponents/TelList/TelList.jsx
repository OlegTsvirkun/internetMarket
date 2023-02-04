import React from "react";
import styles from "./TelList.module.scss";

export const TelList = ({tel,className='',containerClassName='',titleClassName=''}) => {
  if(!Array.isArray(tel)) <></>
	return (
		<ul className={ `${styles.telList}  ${containerClassName}`}>
      <span className={titleClassName} > Контактні телефони:</span>
							{tel &&
								tel.map((item) => (
									<li key={item} className={`${styles.telItem} ${className}`}>
										<a href={"tel:"+item}>{item}</a>
									</li>
								))}
						</ul>
	);
};
