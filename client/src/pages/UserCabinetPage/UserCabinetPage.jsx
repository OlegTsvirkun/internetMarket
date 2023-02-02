import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserConfigs } from '../../components/UserComponents/UserConfigs/UserConfigs';
import { UserOrders } from '../../components/UserComponents/UserOrders/UserOrders';
import { USER_CONFIGS_ROUTE, USER_ORDERS_ROUTE } from '../../utils/constRoutes';
import styles from './UserCabinetPage.module.scss';

export const UserCabinetPage = ({}) =>{
  return (
  <div className={styles.userCabinetPage}>
    UserPage Component
<Routes>
<Route exact path={USER_CONFIGS_ROUTE} element={<UserConfigs />} />
<Route exact path={USER_ORDERS_ROUTE} element={<UserOrders />} />

</Routes>

  </div>
)};

 