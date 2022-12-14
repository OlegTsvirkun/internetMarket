import React from 'react';
import { ContentWrapper } from '../../components/ContentWrapper';
import { MdOutlineFindInPage } from 'react-icons/md';
import styles from './Failpage.module.scss';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';

export const Failpage = ({}) =>{
  return (
 <>
    <ContentWrapper className={styles.failpage}>
      <MdOutlineFindInPage  className={styles.failpage__icon} />
    <h1 className={styles.failpage__404}> 404</h1>
    </ContentWrapper>
  <ContentWrapper  className={styles.failpage__title}>  <p>Сторінка з такою назвою не знайдена</p>
  <Link to = '/'><Button>До головної</Button></Link>
  </ContentWrapper>
 </>
)};

 