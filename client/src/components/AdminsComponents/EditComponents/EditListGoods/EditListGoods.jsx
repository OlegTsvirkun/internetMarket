import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeGood } from '../../../../store/categorySlice';
import adminServices from '../../../../store/services/adminServices';
import { ADMIN_ROUTE, EDIT_GOOD_ROUTE, EDIT_ROUTE } from '../../../../utils/constRoutes';
import { priceFormating } from '../../../../utils/priceFormating';
import { Button } from '../../../UA_Components/Button/Button';
import { DeleteWithBtn } from '../DeleteWithBtn/DeleteWithBtn';
import styles from './EditListGoods.module.scss';

export const EditListGoods = ({}) =>{
	const { isLoading, goods } = useSelector((state) => state.category);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const navigate = useNavigate() 
	const dispatch = useDispatch()
  const handleRemoveGood = (id) => {
		adminServices
			.removeGood({ id: id })
			.then((res) => {
				if (!res.error) {
					console.log(res, '111111');
					dispatch(removeGood(id));
					navigate(ADMIN_ROUTE+'/'+EDIT_ROUTE)
				}
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data);
				}
			});
	};
 if(Object.keys(goods)[0]) return (
  <div className={styles.searchListUpdateGood}>
					{Object.keys(goods).map((item, i) => (
						<div className={styles.goodItem} key={i}>
							<div>
								<p>Назва товару: {goods[item].name}</p>
								<p>Артикул: {goods[item].articul}</p>
								<p>Ціна: {priceFormating(goods[item].price)} грн.</p>
								<div className={styles.buttons}>
									<Link to ={`/admin/${EDIT_GOOD_ROUTE}?id=${goods[item]._id}`}>
										<Button
											className={styles.btn}
										>
											Змінити товар
										</Button>
									</Link>
									<Button
									isAlertButton={true}
										className={styles.btn}
										onClick={() => setIsDeleteOpen(true)}
										
									>
										Видалити товар
									</Button>
								</div>
							</div>
							<img
								className={styles.goodImage}
								src={process.env.REACT_APP_API_URL +goods[item].picture}
							/>
							{isDeleteOpen && (
								<DeleteWithBtn
									onClickNo={() => setIsDeleteOpen(false)}
									onClickYes={() => handleRemoveGood(goods[item]._id)}
								/>
							)}
						</div>
					))}
				</div>
)};

