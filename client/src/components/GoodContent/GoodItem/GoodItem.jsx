import React, { useState } from "react";
import { BsX } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FailPage } from "../../../pages/FailPage";
import { priceFormating } from "../../../utils/priceFormating";
import { GoodBuy } from "../../GoodBuy";
import { ModalAlert } from "../../ModalAlert/ModalAlert";
import { ModalWindow } from "../../ModalWindow";
import { Carousel } from "../../UA_Components/Carousel/Carousel";
import { ContentWrapper } from "../../UA_Components/ContentWrapper";
import styles from "./GoodItem.module.scss";

export const GoodItem = ({}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalImg, setModalImg] = useState("");
  const navigate = useNavigate()
	const { good, images, isLoading, isError, message } = useSelector((state) => state.good);
if(isLoading) return <div>Loading...</div>
// if(isError) return (
  
//    <>  <ModalAlert title="Помилка" message={message} closeClick ={()=>{
// navigate(-1)
//   }
//   } ></ModalAlert></>
// )
if(isError) return <FailPage message={message} />

return (
		<div className={styles.goodItem}>
			<h1 className={styles.goodItem__title}>{good.name}</h1>
			<div className={styles.goodItem__container}>
				<div className={styles.goodItem__left}>
					<div className={styles.goodItem__imageContent}>
						<img
							className={styles.goodItem__image}
							src={process.env.REACT_APP_API_URL + good.picture}
							alt={good.name}
						/>
					</div>
					<h3 className={styles.goodItem__articul}>АРТИКУЛ: {good.articul} </h3>
					{images.length > 0 && (
						<Carousel
							images={images}
							onClick={(e) => {
								setModalImg(e.target.src);
								setIsModalOpen(true);
							}}
						/>
					)}
			
				</div>
				<div className={styles.goodItem__right}>
					<div>
					  <div className={styles.goodItem__price}>
  						{priceFormating(good.price)}ГРН
  					</div>
  					<h2 className={styles.goodItem__descTitle}>
  						Основні характеристики {good.name}:
  					</h2>
  					{good.description?.split("|").map((items, i) => (
  						<p key={i} className={styles.goodItem__desc}>
  							{items.split(":").map((part, i) => {
  								return i == 0 && part.length > 0 ? (
  									<b key={i}>{part}:</b>
  								) : (
  									part
  								);
  							})}
  						</p>
  					))}

					</div>
					<div className={styles.goodItem__buyContainer}>
						<GoodBuy good={good} />
					</div>
				</div>
			</div>
			{isModalOpen && (
				<ModalAlert 
        // bcgClick={setIsModalOpen(false)} 
        closeClick={() => setIsModalOpen(false)} isFirst={false} >
						<img className={styles.modalPicture__img} src={modalImg} alt="" />
				</ModalAlert>
			)}
		
		</div>
	);
};
