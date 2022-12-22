import React, { useEffect,useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGood } from "../../store/goodSlice";
import { ContentWrapper } from "../../components/ContentWrapper/ContentWrapper";
import { Button } from "../../components/Button";
import {BsX} from 'react-icons/bs'
import { priceFormating } from "../../hooks";
import { GoodBuy } from "../../components/GoodBuy";
import styles from "./GoodItem.module.scss";
import { Carousel } from "../../components/ControlledCarousel/Carousel";
import { Modal } from "../../components/Modal/Modal";
import { ModalWindow } from "../../components/ModalWindow/ModalWindow";

export const GoodItem = ({}) => {
	const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  
	const queryParams = searchParams.get("id");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { good, images, isLoading } = useSelector((state) => state.good);
	console.log(good.picture);
console.log(images);
	useEffect(() => {
		dispatch(getGood(queryParams));
	}, [dispatch, queryParams]);

	if (isLoading) return "Loading";

	return (
		good && (
			<ContentWrapper className={styles.goodItem}>
				<Button className = {styles.goodItem__backButton} onClick={() => navigate(-1)} isBackButton={true}>
					Назад
				</Button>
				<h1 className={styles.goodItem__title}>{good.name}</h1>
				<div className={styles.goodItem__container}>
					<div className={styles.goodItem__left}>
						<div className={styles.goodItem__imageContent}>
							<img
								className={styles.goodItem__image}
								src={good.picture}
								alt= {good.name}
							/>
						</div>
							<h3 className={styles.goodItem__articul}>
								АРТИКУЛ: {good.articul}{" "}
							</h3>
           {images.length>0 && <Carousel images={images} onClick ={(e)=>{ setModalImg( e.target.src ); setIsModalOpen(true)}}/>}
						<ContentWrapper className={styles.goodItem__underImage}>
						</ContentWrapper>
					
					</div>
					<div className={styles.goodItem__right}>
						<div className={styles.goodItem__price}>
							{priceFormating(good.price)}ГРН
						</div>
            <h2 className={styles.goodItem__descTitle}>Основные характеристики {good.name}:</h2>
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

           <div className={styles.goodItem__buyContainer}> <GoodBuy good={good} /></div>
					</div>
				</div>
    { isModalOpen  && <ModalWindow onClick={()=>{
    
      setIsModalOpen(false)}}><div  className = {styles.modalPicture}  >
      <div className={styles.modalPicture__close}>
        <BsX
  							
  							size="25"
  							onClick={() => setIsModalOpen(false)}
  						/>
      </div>
            <img className = {styles.modalPicture__img} src={modalImg} alt="" /></div></ModalWindow>}
			</ContentWrapper>
		)
	);
};
