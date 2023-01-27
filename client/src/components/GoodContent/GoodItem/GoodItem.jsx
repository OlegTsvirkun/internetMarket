import React, { useState } from "react";
import { BsX } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FailPage } from "../../../pages/FailPage/Failpage";
import { priceFormating } from "../../../utils/priceFormating";
import { GoodBuy } from "../../GoodBuy";
import { ModalAlert } from "../../ModalAlert/ModalAlert";
import { Carousel } from "../../UA_Components/Carousel/Carousel";
import styles from "./GoodItem.module.scss";

export const GoodItem = ({}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalImg, setModalImg] = useState("");
	const navigate = useNavigate();
	const { good, images, isLoading, isError, message } = useSelector(
		(state) => state.good,
	);
	if (isLoading) return <div>Loading...</div>;

	if (isError) return <FailPage message={message} />;

	return (
		<div className={styles.goodItem}>
			<h1 className={styles.title}>{good.name}</h1>
			<div className={styles.gridContainer}>
				<div className={styles.left}>
				{good.picture&&	<img
						className={styles.image}
						src={process.env.REACT_APP_API_URL + good.picture}
						alt={good.name}
					/>}
					<h3 className={styles.articul}>АРТИКУЛ: {good.articul} </h3>
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
				<div className={styles.right}>
					<div>
						<div className={styles.price}>
							Ціна: {priceFormating(good.price)}ГРН
						</div>
						<h2 className={styles.descTitle}>
							Основні характеристики {good.name}:
						</h2>
						{good.description?.split("|").map((items, i) => (
							<p key={i} className={styles.desc}>
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
					<div className={styles.buyContainer}>
						<GoodBuy good={good} />
					</div>
				</div>
			</div>
			{isModalOpen && (
				<ModalAlert 
				closeClick={() => setIsModalOpen(false)} 
				isFirst={false}
				>
					
						<Carousel
							className={styles.carousel}
							images={images}
							onClick={(e) => {
								setModalImg(e.target.src);
								setIsModalOpen(true);
							}}
						/>
				
				</ModalAlert>
			)}
		</div>
	);
};
