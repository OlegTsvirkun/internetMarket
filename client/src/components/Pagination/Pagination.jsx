import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Pagination.module.scss";

export const Pagination = ({
	currentPage,
	setCurrentPage,
	totalPages,
	className,
	classNameActive,
	classNameCurPage,
}) => {
	const [prevDisplay, setPrevDisplay] = useState(false);
	const [nextDisplay, setNextDisplay] = useState(true);
	const [params, setParams] = useSearchParams();
	const navigate = useNavigate();
	const url = useLocation();
	useEffect(() => {
		params.set("page", currentPage);
		navigate(url.pathname + "?" + params.toString());
	}, [currentPage]);
	const handlePrev = () => {
		setNextDisplay(true);
		if (currentPage - 1 > 1) {
			setCurrentPage(currentPage - 1);
		} else if (currentPage - 1 <= 1) {
			setCurrentPage(currentPage - 1);
			setPrevDisplay(false);
		} else {
			setCurrentPage(1);
			setPrevDisplay(false);
		}
	};

	const handleNext = () => {
		setPrevDisplay(true);
		if (currentPage + 1 < totalPages) {
			setCurrentPage(currentPage + 1);
		} else if (currentPage + 1 == totalPages) {
			setCurrentPage(currentPage + 1);
			setNextDisplay(false);
		} else {
			setCurrentPage(totalPages);
			setNextDisplay(false);
		}
	};

	const handleItem = (index) => {
		setCurrentPage(index + 1);
	};
	console.log("currentPage pagination", currentPage);
	console.log("	totalPages pagination", totalPages);
	return (
		<div className={`${styles.pagination + " " + className}`}>
			{
				<ul className={styles.pagination__container}>
					{currentPage > 1 && (
						<li data-page="prev" className={styles.page} onClick={handlePrev}>
							&lt;
						</li>
					)}

					{totalPages &&
						[...new Array(totalPages)].map((item, index) => (
							<li
								className={`${
									index + 1 == currentPage
										? styles.active + " " + classNameActive + " " + styles.page
										: styles.page + " " + classNameCurPage
								}`}
								data-page={index + 1}
								key={index}
								onClick={() => handleItem(index)}
							>
								{index + 1}
							</li>
						))}
					{currentPage !== totalPages && (
						<li className={styles.page} onClick={handleNext}>
							&gt;
						</li>
					)}
				</ul>
			}
		</div>
	);
};
