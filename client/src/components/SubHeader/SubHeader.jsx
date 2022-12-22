import React from "react";
import {useLocation} from 'react-router-dom'
import { Button } from "../Button/Button";
import { ContentWrapper } from "../ContentWrapper/ContentWrapper";
import { SearchBar } from "../SearchBar/SearchBar";
import {BiCategoryAlt} from 'react-icons/bi'
import styles from "./SubHeader.module.scss";
import { CartBlock } from "../CartBlock/CartBlock";
import { Modal } from "../Modal/Modal";

export const SubHeader = ({ searchValue, setSearchValue }) => {
  const location = useLocation()
  console.log(location.pathname);
  if(location.pathname =='/order')  return <></>
	return (
		<div className={styles.subHeader}>	
    <ContentWrapper className={styles.subHeader__container}>
		
    <Button className ={ styles.subHeader__button }>
    <BiCategoryAlt size= '30'/> <span>КАТАЛОГ ТОВАРОВ</span>
    </Button>
    <SearchBar containerClassName={styles.searchBar} searchValue={searchValue} setSearchValue={setSearchValue} />
     
     
         {location.pathname !=='/' && location.pathname !=='/good'  ? <Button
            className={styles.subHeader__sortButton}
            // onClick={() => setIsDescSort(!isDescSort)}
          >
            Сорт
            {/* {`${isDescSort ? "+" : "-"}`} */}
          </Button>: <div></div>}
          <CartBlock/>
          
        
      
  </ContentWrapper>
  <Modal/>

		
		</div>
	)
};
