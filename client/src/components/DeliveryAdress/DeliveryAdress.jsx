import React from 'react';
import { Input } from '../Input/Input';
import styles from './DeliveryAdress.module.scss';

export const DeliveryAdress = ({}) =>{
  return (
<div className={styles.deliveryAdress}>
					<Input
						require={true}
						type="text"
						charNumberMin={4}
						charNumberMax={9}
						name="city"
						placeholder="Город"
						onChange={() => null}
					/>

					<Input
						require={true}
						type="text"
						charNumberMin={3}
						name="street"
						placeholder="Улица"
						onChange={() => null}
					/>
					<div className={styles.deliveryAdress__address} >
						<label htmlFor="house">Дом 
						<Input
							containerClassname ={styles.deliveryAdress__house}
							require={true}
							type="number"
							name="house"
							id="house"
							placeholder=""
							charNumberMin={1}
							charNumberMax={4}
							onChange={() => null}
						/>
						</label>
	
						<label htmlFor="house">Литера 
						<Input
							containerClassname ={styles.deliveryAdress__lit}
							type="text"
							name="lit"
							id="lit"
							charNumberMinMin={1}
							placeholder=""
							onChange={() => null}
						/>
						</label>
	
						<label htmlFor="appartment">Квартира 
						<Input
							containerClassname ={styles.deliveryAdress__appartment}
							charNumberMax={3}
							charNumberMin={1}
							type="number"
							name="appartment"
							id="appartment"
							placeholder=""
							onChange={() => null}
						/>
						</label>
					</div>
				</div>  
)};

