import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../Button/Button";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper";
import { SearchBar } from "../SearchBar/SearchBar";
import { BiCategoryAlt } from "react-icons/bi";
import styles from "./SubHeader.module.scss";
import { CartBlock } from "../CartBlock/CartBlock";
import { Modal } from "../Modal/Modal";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { MenuCatalog } from "../MenuCatalog/MenuCatalog";

export const SubHeader = ({ searchValue, setSearchValue }) => {
	const location = useLocation();
	const main = useSelector((state) => state.main);
	const { categories, goods } = main;
	// console.log(goods);
	const [isCatMenuOpen, setisCatMenuOpen] = useState(false);
	const handleCat = () => {};

	if (location.pathname == "/order") return <></>;
	return (
		<div className={styles.subHeader}>
			<ContentWrapper className={styles.subHeader__container}>
				<Button
					className={styles.subHeader__buttonCat}
					onClick={() => setisCatMenuOpen(!isCatMenuOpen)}
				>
					{/* <ModalWindow> */}
					{isCatMenuOpen && (
						<ModalWindow onClick={() => setisCatMenuOpen(false)} />
					)}
					{isCatMenuOpen && (
						<MenuCatalog
							isMenuOpen={isCatMenuOpen}
							className={styles.menuCat}
							categories={categories}
							goods={goods}
						/>
					)}
					{/* </ModalWindow> */}
					<BiCategoryAlt size="30" /> <span>КАТАЛОГ ТОВАРОВ</span>
				</Button>
				<SearchBar
					containerClassName={styles.searchBar}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
				/>

				{location.pathname !== "/" && location.pathname !== "/good" ? (
					<Button
						className={styles.subHeader__sortButton}
						// onClick={() => setIsDescSort(!isDescSort)}
					>
						Сорт
						{/* {`${isDescSort ? "+" : "-"}`} */}
					</Button>
				) : (
					<div></div>
				)}
				<CartBlock />
			</ContentWrapper>
			<Modal />
		</div>
	);
};
