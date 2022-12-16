import React from "react";
import { Button } from "../Button/Button";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper";
import { SearchBar } from "../SearchBar/SearchBar";
import {BiCategoryAlt} from 'react-icons/bi'
import styles from "./SubHeader.module.scss";
import { CartBlock } from "../CartBlock/CartBlock";

export const SubHeader = ({ searchValue, setSearchValue }) => {
	return (
		<div className={styles.subHeader}>	
    <ContentWrapper className={styles.subHeader__container}>
		
    <Button className ={ styles.subHeader__button }>
    <BiCategoryAlt size= '30'/> <span>КАТАЛОГ ТОВАРОВ</span>
    </Button>
    <SearchBar containerClassName={styles.searchBar} searchValue={searchValue} setSearchValue={setSearchValue} />
     
     
         {location.pathname !=='/' && <Button
            className={styles.subHeader__sortButton}
            // onClick={() => setIsDescSort(!isDescSort)}
          >
            Сорт
            {/* {`${isDescSort ? "+" : "-"}`} */}
          </Button>}
          <CartBlock/>
        
      
  </ContentWrapper>

		
		</div>
	);
};
