import React, { useCallback, useEffect, useState } from "react";
import { BsSearch, BsX } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import styles from "./SearchBar.module.scss";

export const SearchBar = ({
	containerClassName,
	// searchValue,
	// setSearchValue,
}) => {
	const [searchValue, setSearchValue] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();
	let search = "1";
// const handleSearch = ()=>{
// 	dispat
// }
	// const search = useSelector(searchVal)
	// let searchedGames = [];
	// useEffect(() => {
	// //  searchedGames = GAMES.filter((game) => {
	//   if (
	//     game.title
	//       .toLocaleLowerCase()
	//       .includes(search.toLocaleLowerCase())
	//   )
	//     return true;
	//   return false;
	// });
	// dispatch(findGame(searchedGames));

	// },[search]);

	const onChange = (event) => {
		setSearchValue(event.target.value);
		if (event.target.value.length > 0) {
			// navigate(`/search`);
		}
	};

	return (
		<div className={styles.searchBar + " " + containerClassName}>
			<CiSearch className={styles.searchBar__icon} size="23" />
			<input
				value={searchValue}
				className={styles.searchBar__input}
				type="text"
				onChange={onChange}
				placeholder="ЩО ХОЧЕТЕ ЗНАЙТИ?"
			/>
			{search && (
				<BsX
					className={styles.searchBar__iconClear}
					size="35"
					onClick={() => {
						setSearchValue("");
					
					}}
				/>
			)}
			<Button className={styles.searchBar__button} ><Link to ={`/search?q=${searchValue}`}>ПОШУК</Link></Button>
		</div>
	);
};
