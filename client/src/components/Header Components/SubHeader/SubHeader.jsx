import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../../UA_Components/Button/Button";
import { ContentWrapper } from "../../UA_Components/ContentWrapper/ContentWrapper";
import { SearchBar } from "../SearchBar/SearchBar";
import { BiCategoryAlt } from "react-icons/bi";
import { TbSortDescending } from "react-icons/tb";
import { CartBlock } from "../../Cart/CartBlock/CartBlock";
import { ModalBackground } from "../../AdditionalComponents/ModalBackground/ModalBackground";
import { MenuCatalog } from "../MenuCatalog/MenuCatalog";
import { getMain } from "../../../store/mainSlice";
import { SortMenu } from "../SortMenu/SortMenu";
import styles from "./SubHeader.module.scss";

export const SubHeader = (
	{
	},
) => {
	const location = useLocation();
	const main = useSelector((state) => state.main);

	const { categories, goods } = main;
	const [isSortOpen, setIsSortOpen] = useState(false);
	const [isCatMenuOpen, setisCatMenuOpen] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getMain());
	}, [isCatMenuOpen]);
	if (location.pathname == "/order" || location.pathname == "/finish-order" || location.pathname .split('/').includes('user') )
		return <></>;
     
	  if(location.pathname .split('/').includes('admin') ) return  <div className={styles.caption}>ADMIN PANEL</div>
	  if(location.pathname .split('/').includes('manager') ) return  <div className={styles.caption}>MANAGER PANEL</div>
	return (
		<div className={styles.subHeader}>
			<ContentWrapper className={styles.container}>
				<Button
					className={styles.buttonCat}
					containerClassName={styles.container_buttonCat}
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
					<div
						className={styles.sortButton}
						onClick={() => setIsSortOpen(!isSortOpen)}
					>
						<TbSortDescending size='35'/>
						{isSortOpen && <ModalBackground onClick={() => setIsSortOpen(false)} />}
						{isSortOpen && <SortMenu />}
					</div>
				) : (
					<div></div>
				)}
				<CartBlock />
			</ContentWrapper>
		</div>
	);
};
