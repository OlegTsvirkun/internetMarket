import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ContentWrapper } from '../../components/UA_Components/ContentWrapper/ContentWrapper';
import { UserConfigs } from '../../components/UserComponents/UserConfigs/UserConfigs';
import { UserOrders } from '../../components/UserComponents/UserOrder/UserOrders/UserOrders';
import { USER_CONFIGS_ROUTE, USER_ORDERS_ROUTE } from '../../utils/constRoutes';
import styles from './UserCabinetPage.module.scss';

export const UserCabinetPage = ({}) =>{
  return (
  <ContentWrapper className={styles.userCabinetPage}>
   
<Routes>
<Route exact path={USER_CONFIGS_ROUTE} element={<UserConfigs />} />
<Route exact path={USER_ORDERS_ROUTE} element={<UserOrders />} />

</Routes>

  </ContentWrapper>
)};

 