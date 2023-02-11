import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Router, Routes } from 'react-router-dom';
import { ModalBackground } from '../../components/AdditionalComponents/ModalBackground/ModalBackground';
import { ManagerListOrders } from '../../components/ManagerComponents/ManagerListOrders';
import { ManagerOrderItem } from '../../components/ManagerComponents/ManagerOrderItem/ManagerOrderItem';
import { ManagerPanel } from '../../components/ManagerComponents/ManagerPanel';
import { ContentWrapper } from '../../components/UA_Components/ContentWrapper/ContentWrapper';
import { Spinner } from '../../components/UA_Components/Spinner/Spinner';
import { getOrderStatuses } from '../../store/managerCabinetSlice';
import { MANAGER_LIST_ROUTE } from '../../utils/constRoutes';
import { FailPage } from '../FailPage';
import styles from './ManagerPanelPage.module.scss';

export const ManagerPanelPage = ({isLoading,role}) =>{
 
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrderStatuses())
    return () => {
      
    };
  }, []);
  const {orderList} = useSelector(state=>state.managerCabinet)
  if(isLoading) return<ContentWrapper className={styles.spinner}><Spinner  /> <ModalBackground/></ContentWrapper>
	if(!role.includes("MANAGER") && !isLoading ) return <FailPage/>
  return (
  <ContentWrapper className={styles.managerPanelPage}>
    <ManagerPanel className={styles.managerPanel}/>
    <Routes>
      <Route exact path={MANAGER_LIST_ROUTE} element={<ManagerListOrders orderList={orderList} />}/>
      <Route exact path={'order'} element={<ManagerOrderItem orderList={orderList} />}/>
    </Routes>
  </ContentWrapper>
)};

 