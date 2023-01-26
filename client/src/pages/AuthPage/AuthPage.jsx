import React from "react";
import { ContentWrapper } from "../../components/UA_Components/ContentWrapper";
import { AuthComponent } from "../../components/AuthComponents/AuthComponent/AuthComponent";
import styles from "./AuthPage.module.scss";

export const AuthPage = ({}) => {

	return (
		<ContentWrapper className={styles.authPage}>
			<AuthComponent/>
		</ContentWrapper>
	);
};
