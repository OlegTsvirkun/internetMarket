import React from "react";
import { Categories } from "../../../components/CategoriesList/Categories/Categories";
import { ContentWrapper } from "../../../components/UA_Components/ContentWrapper";
import styles from "./HomePage.module.scss";

export const HomePage = ({}) => {
	return (
		<ContentWrapper >
			<Categories />
		</ContentWrapper>
	);
};
