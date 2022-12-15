import React from "react";
import { Button } from "../Button/Button";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper";
import { SearchBar } from "../SearchBar/SearchBar";
import styles from "./SubHeader.module.scss";

export const SubHeader = ({ searchValue, setSearchValue }) => {
	return (
		<div className={styles.subHeader}>	
    <ContentWrapper className={styles.subHeader__container}>
		
    <Button className ={ styles.subHeader__button }>
      КАТАЛОГ ТОВАРОВ
    </Button>
    <SearchBar  searchValue={searchValue} setSearchValue={setSearchValue} />
     
     
          <Button
            className={styles.subHeader__sortButton}
            // onClick={() => setIsDescSort(!isDescSort)}
          >
            Сортировать по цене 
            {/* {`${isDescSort ? "+" : "-"}`} */}
          </Button>
        
      
  </ContentWrapper>

		
		</div>
	);
};
