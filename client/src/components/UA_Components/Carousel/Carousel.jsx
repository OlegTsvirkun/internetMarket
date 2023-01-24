import React, { useEffect, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "./Carousel.module.scss";
export const Carousel = ({ images,onClick }) => {
	const [image, setImage] = useState(images);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const lastIndex = image.length - 1;
		if (currentIndex < 0) {
			setCurrentIndex(lastIndex);
		}
		if (currentIndex > lastIndex) {
			setCurrentIndex(0);
		}
	}, [currentIndex, image]);

	if (!image) return <div>'loading'</div>;
	return (
			
		<div className={styles.sectionContainer}>
			<div className={styles.sectionCenter}>
				{image.map((item, Index) => {
					let position = "nextSlide";
					if (Index === currentIndex) {
						position = "activeSlide";
					}

					if (
						Index === currentIndex - 1 ||
						(currentIndex === 0 && Index === image.length - 1)
					) {
						position = "lastSlide";
					}

					return (
						<div className={`${styles.article} ${styles[position]}`} key={Index}>
							<img
								src={process.env.REACT_APP_API_URL + item}
								alt={item}
								className={styles.image}
								onClick={onClick}
							/>
						</div>
					);
				})}

				<button
					className={styles.prev}
					onClick={() => setCurrentIndex((prevState) => prevState - 1)}
				>
					<FiChevronLeft />
				</button>

				<button
					className={styles.next}
					onClick={() => setCurrentIndex((prevState) => prevState + 1)}
				>
					<FiChevronRight />
				</button>
			</div>
		</div>
	
	);
};
