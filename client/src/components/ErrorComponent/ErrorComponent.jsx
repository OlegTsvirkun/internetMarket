import React from 'react';
import { ContentWrapper } from '../UA_Components/ContentWrapper';
import styles from './ErrorComponent.module.scss';

export const ErrorComponent = ({children , message}) =>{
  return (
  <ContentWrapper className={styles.error}>
   { message&&<div  className={styles.error}>{message}</div>}
 {children}
  </ContentWrapper>
)};

