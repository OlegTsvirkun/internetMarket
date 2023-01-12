import React, { useState } from "react";
import { Button } from "../../components/Button";
import { ContentWrapper } from "../../components/ContentWrapper";
import { CreateCategory } from "../../components/CreateCategory/CreateCategory";
import { CreateGood } from "../../components/CreateGood/CreateGood";
import { UpdateGood } from "../../components/UpdateGood/UpdateGood";
import styles from "./AdminCreateGood.module.scss";

export const AdminCreateGood = ({}) => {
	const [newCatIsOpen, setNewCatIsOpen] = useState(false);
	const [createGoodIsOpen, setCreateGoodisOpen] = useState(false);
  const [updateGoodIsOpen, setUpdateGoodIsOpen] = useState(false);
	return (
		<div className={styles.adminCreateGood}>
			<ContentWrapper>
				
				<div className={styles.buttonContainer}>
				  	<Button
  						className={styles.buttonContainer__button}
  						onClick={() =>{ 
                setNewCatIsOpen(!newCatIsOpen)
                setCreateGoodisOpen(false)
                setUpdateGoodIsOpen(false)
              }}
  					>
  						Створити категорію
  					</Button>
  			
          	
  					<Button
  						className={styles.buttonContainer__button}
  						onClick={() => {
                setCreateGoodisOpen(!createGoodIsOpen)
                setNewCatIsOpen(false)
                setUpdateGoodIsOpen(false)
              
              }}
  					>
  						Створити товар
  					</Button>
  					<Button
  						className={styles.buttonContainer__button}
  						onClick={() => {
                setUpdateGoodIsOpen(!updateGoodIsOpen)
                setCreateGoodisOpen(false)
                setNewCatIsOpen(false)
              
              }}
  					>
  						Змінити товар
  					</Button>
  			
				</div>
			
				{newCatIsOpen && <CreateCategory setNewCatIsOpen={setNewCatIsOpen} />}
				{createGoodIsOpen && <CreateGood setCreateGoodisOpen={setCreateGoodisOpen} />}
        {updateGoodIsOpen && <UpdateGood/>}
			</ContentWrapper>
		</div>
	);
};
