import React from 'react';
import { ContentWrapper } from '../../components/ContentWrapper';
import { BiConfused } from 'react-icons/bi';
import styles from './FailPage.module.scss';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';

export const FailPage = ({}) =>{
  return (
 <>
    <ContentWrapper className={styles.failpage}>
      <BiConfused  className={styles.failpage__icon} />
    <h1 className={styles.failpage__404}></h1>
    </ContentWrapper>
  <ContentWrapper  className={styles.failpage__title}>  <p>Сторінка з такою назвою не знайдена або доступ закрито </p>
  <Link to = '/'><Button>До головної</Button></Link>
  </ContentWrapper>
 </>
)};

 