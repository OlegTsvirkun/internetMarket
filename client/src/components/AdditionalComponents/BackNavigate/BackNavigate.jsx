import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../UA_Components/Button';
import { ContentWrapper } from '../../UA_Components/ContentWrapper';
import styles from './BackNavigate.module.scss';

export const BackNavigate = ({}) =>{
	const navigate = useNavigate();

  return (
  <ContentWrapper className={styles.backNavigate}>
    
   	<Button
				className={styles.backButton}
				onClick={() => navigate(-1)}
				isBackButton={true}
			>
				Назад
			</Button>
  </ContentWrapper>
)};

