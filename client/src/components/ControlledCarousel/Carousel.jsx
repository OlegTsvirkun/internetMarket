import React, { useEffect, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "./Carousel.scss";
export const Carousel = ({ images,onClick }) => {
	const [image, setImage] = useState(images);
	console.log(image);
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

	console.log(currentIndex);
	if (!image) return <div>'loading'</div>;
	return (
			
		<section className="section">
			<div className="section-center">
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
						<article className={position} key={Index}>
							<img
								src={process.env.REACT_APP_API_URL + item}
								alt={item}
								className="image"
								onClick={onClick}
							/>
							{/* <FaQuoteRight className='icon' /> */}
						</article>
					);
				})}

				<button
					className="prev"
					onClick={() => setCurrentIndex((prevState) => prevState - 1)}
				>
					<FiChevronLeft />
				</button>

				<button
					className="next"
					onClick={() => setCurrentIndex((prevState) => prevState + 1)}
				>
					<FiChevronRight />
				</button>
			</div>
		</section>
	
	);
};
