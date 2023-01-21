import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../../../components/Button";
import { ContentWrapper } from "../../../components/ContentWrapper";

import { CreateGood } from "../CreateGoodPage/CreateGoodPage";
import { UpdateGood } from "../../../components/UpdateGood/UpdateGood";
import { cleanupCatSlice } from "../../../store/categorySlice";
import { CREATE_CATEGORY_ROUTE, CREATE_GOOD_ROUTE } from "../../../utils/constRoutes";
import styles from "./AdminPage.module.scss";

export const AdminPage = ({}) => {

  const [updateGoodIsOpen, setUpdateGoodIsOpen] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
	dispatch(cleanupCatSlice())
  }, []);
	return (
		<div className={styles.adminCreateGood}>
			<ContentWrapper>
				
				<div className={styles.buttonContainer}>
				  	<Link to ={CREATE_CATEGORY_ROUTE} >
				  		<Button
	  						className={styles.buttonContainer__button}
	  					>
	  						Створити категорію
	  					</Button>
				  	</Link>
  			
          	
  					<Link to= {CREATE_GOOD_ROUTE}>
  						<Button
	  						className={styles.buttonContainer__button}
	  					>
	  						Створити товар
	  					</Button>
  					</Link>
  					<Button
  						className={styles.buttonContainer__button}
  						onClick={() => {
                setUpdateGoodIsOpen(!updateGoodIsOpen)
              
              }}
  					>
  						Змінити товар
  					</Button>
  			
				</div>
			
				
				
        {updateGoodIsOpen && <UpdateGood/>}
			</ContentWrapper>
		</div>
	);
};
