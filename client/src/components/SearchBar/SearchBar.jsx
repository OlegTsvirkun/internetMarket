import React, { useCallback, useEffect } from "react";
import { BsSearch, BsX } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button } from "../Button/Button";
import styles from "./SearchBar.module.scss";

export const SearchBar = ({ containerClassName ,searchValue, setSearchValue }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let search = "1";
	// const search = useSelector(searchVal)
	let searchedGames = [];
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
		// dispatch(setSearchVal(event.target.value))
		if (event.target.value.length > 0) {
			// navigate(`/search`);
		}
		//  else navigate("/");
	};

	return (
		
			<div className={styles.searchBar + ' '+ containerClassName}>
				
				  <CiSearch className={styles.searchBar__icon} size="23" />
  				<input
  					value={searchValue}
  					className={styles.searchBar__input}
  					type="text"
  					onChange={onChange}
  					placeholder="ЧТО ХОТИТЕ НАЙТИ?"
  				/>
  				{search && (
  					<BsX
  						className={styles.searchBar__iconClear}
  						size="35"
  						// color={searchValue.length > 0 ? "white" : "grey"}
  						onClick={() => {
  							setSearchValue("");
  							// dispatch(setSearchVal(''))
  							// dispatch(findGame([]));
  							// navigate("/");
  						}}
  					/>
  				)}
				<Button className={ styles.searchBar__button }>ПОИСК</Button>
			</div>
		
	);
};
