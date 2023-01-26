import React from 'react';
import { ContentWrapper } from '../../components/UA_Components/ContentWrapper';
import { BiConfused } from 'react-icons/bi';
import styles from './FailPage.module.scss';
import { Button } from '../../components/UA_Components/Button';
import { Link } from 'react-router-dom';
import { BackNavigate } from '../../components/AdditionalComponents/BackNavigate/BackNavigate';

export const FailPage = ({message}) =>{
  return (
 <>
    <ContentWrapper className={styles.failpage}>
      <BackNavigate/>
      <BiConfused  className={styles.failpage__icon} />
    <h1 className={styles.failpage__404}></h1>
    {/* </ContentWrapper> */}
  {/* <ContentWrapper  className={styles.failpage__title}>   */}
  <p className={styles.failpage__title}>{message ? message:'Сторінка з такою назвою не знайдена або доступ закрито' }</p>
  <Link to = '/'><Button>До головної</Button></Link>
  </ContentWrapper>
 </>
)};

 