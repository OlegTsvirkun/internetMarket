import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { Button } from "../../UA_Components/Button/Button";
import { Input } from "../../UA_Components/Input";
import styles from "./SearchBar.module.scss";

export const SearchBar = ({ containerClassName }) => {
	const [searchValue, setSearchValue] = useState("");

	const onChange = (event) => {
		setSearchValue(event.target.value);
		if (event.target.value.length > 0) {
		}
	};

	return (
		<form className={styles.searchBar + " " + containerClassName} action="post">
			<CiSearch className={styles.icon} size="23" />
			<Input
				containerClassName={styles.inputContainer}
				value={searchValue}
				className={styles.input}
				type="search"
				onChange={onChange}
				placeholder="ЩО ХОЧЕТЕ ЗНАЙТИ?"
			/>
			<Link to={`/search?q=${searchValue}`}>
				<Button
					className={styles.searchButton}
					isOrangeButton={true}
					onClick={() => setSearchValue("")}
				>
					ПОШУК
				</Button>
			</Link>
		</form>
	);
};
