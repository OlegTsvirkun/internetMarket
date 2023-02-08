import React from "react";
import { ContentWrapper } from "../../components/UA_Components/ContentWrapper/ContentWrapper";
import { BiConfused } from "react-icons/bi";
import { Button } from "../../components/UA_Components/Button/Button";
import { Link } from "react-router-dom";
import { BackNavigate } from "../../components/AdditionalComponents/BackNavigate/BackNavigate";
import styles from './Failpage.module.scss'

export const FailPage = ({ message, backTo=true }) => {
	return (
			<ContentWrapper className={styles.failpage}>
			{!backTo &&	<BackNavigate />}
				<BiConfused className={styles.icon} />
				<p className={styles.title}>
					{message 
						? message
						: "Сторінка з такою назвою не знайдена або доступ закрито"}
				</p>
				<Link className={styles.backButton} to="/">
					<Button>До головної</Button>
				</Link>
			</ContentWrapper>
	);
};
