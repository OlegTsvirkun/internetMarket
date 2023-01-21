import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../Button/Button";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper";
import { SearchBar } from "../SearchBar/SearchBar";
import { BiCategoryAlt } from "react-icons/bi";
import { TbSortDescending } from "react-icons/tb";
// import { RiSortAsc } from "react-icons/ri";
import styles from "./SubHeader.module.scss";
import { CartBlock } from "../Cart/CartBlock/CartBlock";
import { Modal } from "../Modal/Modal";
import { ModalBackground } from "../ModalBackground/ModalBackground";
import { MenuCatalog } from "../MenuCatalog/MenuCatalog";
import { getMain } from "../../store/mainSlice";
import { SortMenu } from "../SortMenu/SortMenu";

export const SubHeader = (
	{
		//  searchValue, setSearchValue
	},
) => {
	const location = useLocation();
	const main = useSelector((state) => state.main);
	const isVisible = useSelector((state) => state.cart.isCartOpen);

	const { categories, goods } = main;
	const [isSortOpen, setIsSortOpen] = useState(false);
	const [isCatMenuOpen, setisCatMenuOpen] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getMain());
		console.log(location.pathname.split('/').includes('admin'));
	}, [isCatMenuOpen]);
	if (location.pathname == "/order" || location.pathname == "/finish-order" )
		return <></>;
     
	  if(location.pathname .split('/').includes('admin')) return  <div className={styles.caption}>ADMIN PANEL</div>
	return (
		<div className={styles.subHeader}>
			<ContentWrapper className={styles.subHeader__container}>
				<Button
					className={styles.subHeader__buttonCat}
					onClick={() => setisCatMenuOpen(!isCatMenuOpen)}
				>
					{isCatMenuOpen && (
						<ModalBackground onClick={() => setisCatMenuOpen(false)} />
					)}
					{isCatMenuOpen && (
						<MenuCatalog
							isMenuOpen={isCatMenuOpen}
							className={styles.menuCat}
							categories={categories}
							goods={goods}
							setisCatMenuOpen={setisCatMenuOpen}
						/>
					)}
					<BiCategoryAlt size="30" /> <span>КАТАЛОГ ТОВАРІВ</span>
				</Button>
				<SearchBar containerClassName={styles.searchBar} />

				{location.pathname !== "/" && location.pathname !== "/good" ? (
					<Button
						className={styles.subHeader__sortButton}
						onClick={() => setIsSortOpen(!isSortOpen)}
					>
						<TbSortDescending size='35'/>
						{isSortOpen && <ModalBackground onClick={() => setIsSortOpen(false)} />}
						{isSortOpen && <SortMenu />}
					</Button>
				) : (
					<div></div>
				)}
				<CartBlock />
				
				{/* {isVisible && <ModalBackground />} */}
			</ContentWrapper>
			{/* <Modal /> */}
		</div>
	);
};
